import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Tutorial } from '../../ui'

import { STEPS } from './constants'

export const TutorialContainer: FC = () => {
    const dispatch = useDispatch<any>()

    const isVisible = true
    const isHintVisible = true
    const isRoundTimeExpired = false

    const [active, setActive] = useState(0)

    const handleHintClick = useCallback(() => {
        const isLast = active + 1 >= STEPS.length

        if (isLast) {
            // Сбрасываем все
        } else if (active === 2) {
            // Начинаем раунд
        } else {
            setActive(active + 1)
        }
    }, [dispatch, active])

    useEffect(() => {
        if (isRoundTimeExpired) {
            setActive((prev) => prev + 1)

            // Ловим конец раунда
        }
    }, [dispatch, isRoundTimeExpired])

    return (
        <Tutorial
            isVisible={isVisible}
            isHintVisible={isHintVisible}
            active={active}
            step={STEPS[active]}
            onHintClick={handleHintClick}
        />
    )
}
