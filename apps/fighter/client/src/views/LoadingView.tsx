import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthCheck } from '@apps/fighter/client/features/auth'

export const LoadingView = () => {
    const status = useAuthCheck()
    const navigate = useNavigate()
    useEffect(() => {
        if (!status.checking) {
            if (status.authorized) {
                navigate('/')
            } else {
                navigate('/connect')
            }
        }
    }, [status.authorized, navigate, status.checking])

    return <div>Loading...</div>
}
