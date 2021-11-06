import { Button, Card, CardContent, makeStyles, CardActions, Typography, TextField} from '@material-ui/core'
import { FormikProps, useFormik } from 'formik'
import Loader from 'react-loader-spinner';
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import {useContext} from 'react'
import {AppContext} from '../context/context'
import * as Yup from 'yup'

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
    }
}))

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Email too short')
        .email('Provide valid email')
        .required('Email is required'),
    password: Yup.string().min(10, 'Password has to be min 10 symbols').required('Password is required'),
})

const initialValues: InitialValues = {
    email: '',
    password: ''
}

export const AuthPage: React.FC = () => {
    const classes = useStyles();
    const {request, loading, error} = useHttp()
    const appContext = useContext(AppContext)

    const handleSubmit = async (values: InitialValues) => {
        const body = JSON.stringify({email: values.email, password: values.password})
        const data = await request('/api/auth/login', 'POST', body, {'Content-Type': 'application/json'})
        appContext.login(data.token, data.userId, data.email)
        
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
                        Login
                    </Typography>
                    <TextField
                        id='email'
                        name='email'
                        label='Email'
                        variant='outlined'
                        required
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
                    {
                        error &&
                            <Typography variant='body2' color='error'>
                                {error}
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
                        Login
                    </Button>
                    <NavLink to='/registration' className={classes.link}>
                    <Button variant="contained" disabled={loading}>
                        register
                    </Button>
                    </NavLink>
                </CardActions>
            </Card>
        </form>
    );
}

//TYPES

interface InitialValues {
    email: string;
    password: string;
}