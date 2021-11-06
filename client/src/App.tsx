import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./hooks/routes.hook";
import { AppContext } from "./context/context";
import { useEffect, useReducer } from "react";
import { initialState, noteReducer } from "./reducer/reducer";
//import { storageName } from './constants/constants';




const App: React.FC = () => {
  const {login, logout, token, userId, email} = useAuth()
  const [state, dispatch] = useReducer(noteReducer, initialState)
  const isAuth = !!token
  const routes = useRoutes(isAuth)
  console.log('inside app');
  
  useEffect(() => {
    // const checkExpiration = (): void => {
    //   let localStorageData: null | LoginData = JSON.parse(localStorage.getItem(storageName)!)
    //   console.log('in use effect');

    //   if (localStorageData && localStorageData.expirationDate < new Date()) {
    //     console.log('in if statment');
    //     localStorage.removeItem(storageName)
    //   }
    // }

    // const checkExpirationDateInterval =  setInterval(() => checkExpiration(), 15*60*1000 )
    
    window.onunload = () => localStorage.clear()
    // return () => {
    //   clearInterval(checkExpirationDateInterval)
    //   localStorage.clear()
    // }
    
  }, [])
  
  return(
    <AppContext.Provider value={{login, logout, email, token, userId, isAuth, state, dispatch}}>
      {routes}
    </AppContext.Provider>
  )
}

export default App;


//TYPES

// interface LoginData{
//   token: string
//   id: string
//   email: string
//   expirationDate: Date
// }