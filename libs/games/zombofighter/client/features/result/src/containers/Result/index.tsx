import React, { FC } from 'react'

import { ResultPopupContainer } from '../Popup'
import { ResultPlayerContainer } from '../Player'

export const ResultContainer: FC = () => {
    return (
        <>
            <ResultPopupContainer />
            <ResultPlayerContainer />
        </>
    )
}
