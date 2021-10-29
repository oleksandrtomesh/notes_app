import { useState, useCallback, useEffect } from 'react';
import { storageName } from '../constants/constants';



export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    //set data to local storage during login
    const login = useCallback((jwtToken: string, id: string, email: string) => {
        setToken(jwtToken)
        setUserId(id)
        setEmail(email)
        let expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1)
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, id, email, expirationDate }))
    }, [])
    //nullable data if user logout
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    //check that data is already in local storage
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName)!)

        if(data && data.token){
            login(data.token, data.id, data.email)
        }
    }, [login])

    return {login, logout, token, userId, email}
}