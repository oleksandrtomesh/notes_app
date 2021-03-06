import { AppBar, Button, makeStyles, Theme, Toolbar, Typography, createStyles} from "@material-ui/core"
import { useContext } from "react"
import { AppContext } from "../context/context"

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        header: {
            marginBottom: '1rem',
        },
        title: {
            flexGrow: 1
        }
    })
)

export const Header = () => {
    const classes = useStyles()
    const {email, logout} = useContext(AppContext)

    return(
        <header className={classes.header}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title}>
                        {email}
                    </Typography>
                    <Button onClick={logout} color='inherit'>
                        Logout
                    </Button>
                </Toolbar> 
            </AppBar>  
        </header>)
}