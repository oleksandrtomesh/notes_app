import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./hooks/routes.hook";
import { AuthContext } from "./context/authContext";




const App: React.FC = () => {
  const {login, logout, token, userId, email} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)
  
  
  return(
    <AuthContext.Provider value={{login, logout, email, token, userId, isAuth}}>
      {routes}
    </AuthContext.Provider>
  )
}

export default App;
