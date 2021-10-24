const {Router} = require('express')
const User = require('../models/User')
const config = require('config')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = Router()

// /api/auth

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password has to have min 10 symbols')
            .isLength({min: 6})
    ]
    , async (req, res) => {
    try{
        //make validations
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data until registration'
            })
        }

        const {email, password} = req.body

        //check that user have been already registered
        const candidate = await User.findOne({email})

        if(candidate){
            return res.status(400).json({message: 'Email has been already used. Please register with different email.'})
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        //create new user and save in DB
        const user = new User({email, password: hashedPassword})
        await user.save()

        res.status(201).json({message: 'User have been registered'})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

router.post(
    '/login',
    [
        check('email', 'Provide correct email').normalizeEmail().isEmail(),
        check('password', 'Provide password').exists()
    ], 
    async (req, res) => {
    try{
        //make validations
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data until login'
            })
        }

        const {email, password} = req.body
        
        //check that is user with provided email in DB
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }
        //compare provided password with hash password in DB
        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            return res.status(400).json({message: 'Wrong data until login'})
        }

        //create token
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        

        res.json({token, userId: user.id, email: user.email})


    } catch (e) {
        res.status(500).json({message: 'Something went wrong. Try again'})
    }
})

module.exports = router