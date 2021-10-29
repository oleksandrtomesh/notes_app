import { useCallback, useState } from "react"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async(url, method = 'GET', body = null, token=null) => {
        setLoading(true)
        try{
            let headers = {}
            if (token !== null) headers.Authorization = `Bearer ${token}`
            if (method !== 'GET'){
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || 'Something went wrong')
            }
            setLoading(false)
            return data
        } catch(err){
            setLoading(false)
            setError(err.message)
            throw err
        }
        
    }, [])

    const clearError = () => setError(null)

    return {loading, error, request, clearError}
}   