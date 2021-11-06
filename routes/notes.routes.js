//same const {Router} = require('express)
const express = require('express')
const Note = require('../models/Note')
const getCurrentDate = require('../utils/getDate')
const authMiddleware = require('../middlewares/auth.middleware')

//create router for notes
const router = express.Router()

// /api/notes

//get notes
router.get('/', authMiddleware, async (req, res) => {
    try{
        const notes = await Note.find({owner: req.user.userId})
        if(!notes) throw new Error('No any notes')
        res.status(200).json({success: true, notes})
    } catch(e){
        res.status(500).json({message: 'Something went wrong, try again'})
    }
})

// add note
router.post('/', authMiddleware, async (req, res) => {
    try{
        const timeStamp = getCurrentDate()
        const {title, body} = req.body
        const note = new Note({title, body, timeStamp, owner: req.user.userId})
        await note.save()
        res.status(201).json({message: 'Note added', newNote: note, addedNoteId: note._id})

    } catch(err){
        if(err){
            res.status(500).json({message: err})
        }else {
            res.status(500).json({message: 'Server error in post method'})
        }
    }
})

// update note
router.put('/', async (req,res) => {
    try {
        const {id, title, body} = req.body
        
        const updatedNote = await Note.findByIdAndUpdate(
            { _id: id }, 
            { body: body, title: title }, 
            {new: true}
            )
        
        res.status(200).json({message: 'Update successfully', notes: [updatedNote]})
    } catch (err) {
        res.status(500).json({message: 'Server error in put method'})
    }
})


// delete note
router.delete('/', async (req, res) => {
    try {
        const {id} = req.body
        await Note.findByIdAndDelete(id)
        res.status(200).json({message: "Successfully delete"})
    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
})

module.exports = router