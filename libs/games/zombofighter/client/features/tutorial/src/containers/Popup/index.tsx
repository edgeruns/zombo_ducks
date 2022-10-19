import { FC, useCallback, useState } from 'react'

import { Popup } from '../../ui'

export const TutorialPopupContainer: FC = () => {
    const isVisible = true

    const [screenIndex, setScreenIndex] = useState(0)

    const handlePrevClick = useCallback(() => {
        setScreenIndex(prev => prev - 1)
    }, [])

    const handleNextClick = useCallback(() => {
        setScreenIndex(prev => prev + 1)
    }, [])

    const handleCrossClick = useCallback(() => {

    }, [])

    return (
        <Popup
            isVisible={isVisible}
            screenIndex={screenIndex}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            onCrossClick={handleCrossClick}
        />
    )
}
