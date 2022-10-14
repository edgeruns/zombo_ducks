import { useSelector } from 'react-redux'

import user from '@apps/games/zombofighter/client/features/shared/user'

export function usePlayer() {
    return useSelector(user.selectors.getUser)
}
