import React, { FC } from 'react'

import { Section } from '../Section'
import styles from './Offer.module.scss'

export const Offer: FC = () => {
    return (
        <Section
            id="offer"
            title="What do we offer?"
            className={styles.wrapper}
        >
            <div className={styles.points}>
                <div className={styles.point}>
                    We are the first P2E game platform based on
                    NEAR protocol, which will aggregate different
                    games from us and our partner projects. By
                    minting ZomboDucks you will get access to
                    the platform when launched (expected by
                    the end of May).
                </div>

                <div className={styles.point}>
                    In addition, we aim to create a launchpad
                    for independent game developers,
                    providing technical and marketing support.
                </div>

                <div className={styles.point}>
                    Prior that, we are going to develop a
                    mini-game, the beta-version of which will
                    appear prior the mint. Check our discord
                    announcement for further details.
                </div>
            </div>
        </Section>
    )
}
