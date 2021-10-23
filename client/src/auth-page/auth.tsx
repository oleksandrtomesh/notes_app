import { Button, Card, CardContent, makeStyles, CardActions, Typography, TextField} from '@material-ui/core'
import { FormikProps, useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook';


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

const initialValues: InitialValues = {
    email: '',
    password: ''
}

export const AuthPage: React.FC = () => {
    const classes = useStyles();
    const {request, loading, error} = useHttp()
    const handleSubmit = async (values: InitialValues) => {
        const body = JSON.stringify({email: values.email, password: values.password})
        const data = await request('/api/auth/login', 'POST', body, {'Content-Type': 'application/json'})
        console.log(data);
        
    }

    const formik: FormikProps<InitialValues> = useFormik<InitialValues>({
        initialValues,
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
                        type='email'
                        variant='outlined'
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange}
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
                    />
                </CardContent>
                <CardActions>
                <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                    <NavLink to='/registration' className={classes.link}>
                    <Button variant="contained">
                        
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