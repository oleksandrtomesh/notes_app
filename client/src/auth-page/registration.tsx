import { Button, Card, CardContent, makeStyles, CardActions, Typography, TextField } from '@material-ui/core'
import { FormikProps, useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import * as Yup from 'yup'
import Loader from 'react-loader-spinner'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginTop: '10%',

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
    card: {
        minWidth: 275,
    },
    link: {
        textDecoration: 'none'
    },
    success: {
        color: 'green'
    }
}))

const initialValues: InitialValues = {
    email: '',
    password: '',
    passwordRepeat: ''
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Email too short')
        .email('Provide valid email')
        .required('Email is required'),
    password: Yup.string().min(10, 'Password has to be min 10 symbols').required('Password is required'),
    passwordRepeat: Yup.string()
        .min(10, 'Password has to be min 10 symbols')
        .oneOf([Yup.ref('password')], 'Password does not match')
        .required('Password is required'),
})

export const RegPage: React.FC = () => {
    const [serverResponse, setServerResponse] = useState<string>("")

    const classes = useStyles()
    const { request, loading, error, clearError } = useHttp()


    const handleSubmit = async (values: InitialValues, actions: any) => {
        if (values.password !== values.passwordRepeat) {

        }
        const body = JSON.stringify({ email: values.email, password: values.password })
        const data = await request('/api/auth/register', 'POST', body, { 'Content-Type': 'application/json' })
        setServerResponse(data.message)
        actions.resetForm()
        clearError()
    }

    const formik: FormikProps<InitialValues> = useFormik<InitialValues>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    });


    return (
        <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Card className={classes.card} raised>
                <CardContent className={classes.root}>
                    <Typography variant='h5'>
                        Registration
                    </Typography>
                    <TextField
                        id='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        id='password'
                        name='password'
                        label='Password'
                        type="password"
                        variant='outlined'
                        required
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        id='passwordRepeat'
                        name='passwordRepeat'
                        label='Repeat password'
                        type="password"
                        variant='outlined'
                        required
                        value={formik.values.passwordRepeat}
                        onChange={formik.handleChange}
                        error={formik.touched.passwordRepeat && !!formik.errors.passwordRepeat}
                        helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
                    />
                    {
                        error 
                            ?   <Typography variant='body2' color='error'>
                                    {error}
                                </Typography>
                            :   <Typography className={classes.success} variant='body2' >
                                    {serverResponse}
                                </Typography>
                    }
                    {
                        loading &&
                            <Loader
                                type="ThreeDots"
                                color="#3f51b5"
                                height={20}
                                width={100}
                                timeout={3000} //3 secs
                            />
                    }
                </CardContent>
                <CardActions>
                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                        Register
                    </Button>
                    <NavLink to='/login' className={classes.link}>
                        <Button variant="contained" disabled={loading}>
                            login
                        </Button>
                    </NavLink>
                </CardActions>
            </Card>
        </form>
    );
}

//TYPES

interface InitialValues {
    email: string
    password: string
    passwordRepeat: string
}