import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import sounds from '@apps/games/zombofighter/client/features/shared/sounds'

import { FeatureDispatch } from '../../data/store.feature'
import { Menu } from '../../ui'

export const MenuContainer: FC = () => {
    const dispatch = useDispatch<FeatureDispatch>()

    const isSoundsEnabled = useSelector(sounds.selectors.isEnabled)

    const handleSoundClick = useCallback(() => {
        dispatch(sounds.actions.toggle())
    }, [dispatch])

    const handleTutorialClick = useCallback(() => {

    }, [])

    return (
        <Menu
            isSoundsDisabled={!isSoundsEnabled}
            onSoundClick={handleSoundClick}
            onTutorialClick={handleTutorialClick}
        />
    )
}
