import { createContext, Dispatch } from "react";
import { Action, State } from "../reducer/reducer";

const noob = () => {}
export const AuthContext = createContext<AuthContextType>({
    token: null,
    email: null,
    userId: null,
    logout: noob,
    login: noob,
    isAuth: false,
    state: null,
    dispatch: null
})

//types
interface AuthContextType  {
    token: null | string
    userId: null | string
    email: null | string
    login: (jwtToken: string, id: string, email: string) => void
    logout: () => void
    isAuth: boolean
    state: State | null,
    dispatch: Dispatch<Action> | null
}