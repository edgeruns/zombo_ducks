import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'
import { useTutorial } from '@apps/games/zombofighter/client/features/tutorial'
import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import * as selectors from '../data/selectors'

export function useStartButton() {
    const dispatch = useDispatch<any>()

    const isTutorialMode = useSelector(game.selectors.isTutorialMode)
    const isStartButtonVisible = useSelector(selectors.isStartButtonVisible)

    const { fakeStartSearch } = useTutorial()

    const handleClick = useCallback(() => {
        playSound(Sounds.StartSearching)

        if (isTutorialMode) {
            fakeStartSearch()
        } else {
            dispatch(game.actions.startSearch())
        }
    }, [dispatch, isTutorialMode, fakeStartSearch])

    return useMemo(() => {
        return {
            isVisible: isStartButtonVisible,
            text: 'START',
            handleClick
        }
    }, [isStartButtonVisible, handleClick])
}
