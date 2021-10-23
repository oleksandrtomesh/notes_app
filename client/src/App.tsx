import { Route, Switch } from "react-router";
import { AuthPage } from "./auth-page/auth";
import { Notes } from "./notes-page/Notes";
import { RegPage } from './auth-page/registration';




const App: React.FC = () => {
  return(
    <Switch>
      <Route path='/notes'>
        <Notes/>
      </Route>
      <Route path='/registration'>
        <RegPage/>
      </Route>
      <Route path='/'>
        <AuthPage/>
      </Route>
    </Switch>
    
  )
}

export default App;
