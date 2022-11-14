import React, { FC } from 'react'

import { ResultPlayerContainer } from '../Player'
import { ResultPopupContainer } from '../Popup'

export const ResultContainer: FC = () => {
    return (
        <>
            <ResultPopupContainer />
            <ResultPlayerContainer />
        </>
    )
}
