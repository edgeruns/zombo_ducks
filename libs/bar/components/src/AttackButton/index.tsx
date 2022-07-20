import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, actions, selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'

import styles from './AttackButton.module.scss'

export const AttackButton: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isRoundScene = useSelector(selectors.isRoundScene)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const playerDefences = useSelector(selectors.getPlayerDefences)
    const isAttacked = useSelector(selectors.isAttacked)

    const isVisible = !isAttacked && isRoundScene && (playerAttacks.length > 0 || playerDefences.length > 0)

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const handleClick = useCallback(() => {
        dispatch(actions.attack())
    }, [dispatch])

    return (
        <Button
            className={rootClassName}
            disabled={isAttacked}
            onClick={handleClick}
        >
            ATTACK
        </Button>
    )
}
