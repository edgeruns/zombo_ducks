import React, { FC } from 'react'

import { Section } from '../Section'
import { Row } from '../Row'
import { Phase } from './Phase'
import { PHASES } from './constants'

import styles from './Roadmap.module.scss'

export const Roadmap: FC = () => {
    return (
        <Row>
            <Section
                id="roadmap"
                title="Roadmap"
                className={styles.wrapper}
            >
                <div className={styles.content}>
                    {PHASES.map((phase, index) => (
                        <Phase
                            key={index}
                            {...phase}
                        />
                    ))}
                </div>
            </Section>
        </Row>
    )
}
