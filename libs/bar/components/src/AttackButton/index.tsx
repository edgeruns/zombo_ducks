import React, { FC, useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'
import { useFakeActions } from '@apps/bar/utils'

import styles from './AttackButton.module.scss'

export const AttackButton: FC = () => {
    const { fakeAttack } = useFakeActions()

    const isRoundScene = useSelector(selectors.isRoundScene)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)

    const [attacked, setAttacked] = useState(false)

    const isVisible = !attacked && isRoundScene && playerAttacks.length > 0

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const handleClick = useCallback(() => {
        setAttacked(true)
        fakeAttack()
    }, [fakeAttack])

    useEffect(() => {
        if (isRoundScene) {
            setAttacked(false)
        }
    }, [isRoundScene])

    return (
        <Button
            className={rootClassName}
            disabled={attacked}
            onClick={handleClick}
        >
            ATTACK
        </Button>
    )
}
