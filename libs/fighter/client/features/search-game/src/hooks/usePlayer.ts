import { useSelector } from 'react-redux'
import user from '@apps/fighter/client/features/shared/user'

export function usePlayer() {
    return useSelector(user.selectors.getUser)
}
