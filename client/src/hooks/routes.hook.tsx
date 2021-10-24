import { Redirect, Route, Switch } from "react-router"
import { AuthPage } from "../auth-page/auth"
import { RegPage } from "../auth-page/registration"
import { Notes } from "../notes-page/Notes"

export const useRoutes = (isAuth: boolean) => {

    if (isAuth) {
        return (<Switch>
            <Route path='/notes'>
                <Notes />
            </Route>
            <Redirect to='/notes'/>
        </Switch>)
    }

    return (
        <Switch>
            <Route path='/registration'>
                <RegPage />
            </Route>
            <Route path='/'>
                <AuthPage />
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}