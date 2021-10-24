import { createContext } from "react";

const noob = () => {}
export const AuthContext = createContext<AuthContextType>({
    token: null,
    email: null,
    userId: null,
    logout: noob,
    login: noob,
    isAuth: false
})

//types

interface AuthContextType  {
    token: null | string
    userId: null | string
    email: null | string
    login: (jwtToken: string, id: string, email: string) => void
    logout: () => void
    isAuth: boolean
}