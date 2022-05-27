import React, { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { useScrollView, useBreakpoint } from '@apps/utils'

import { Section } from '../Section'
import styles from './Mint.module.scss'

export const Mint: FC = () => {
    const [ducksExpanded, setDucksExpanded] = useState(false)

    const contentRef = useRef<HTMLDivElement>(null)

    const scrollPercent = useScrollView(contentRef, ducksExpanded)
    const breakpoint = useBreakpoint()

    const missionDucksClassName = classNames(
        styles['mission-ducks'],
        ducksExpanded && styles['mission-ducks_expanded']
    )

    useEffect(() => {
        if (!ducksExpanded) {
            const expandPercent = breakpoint === 'desktop' ? 15 : 55

            if (scrollPercent > expandPercent) {
                setDucksExpanded(true)
            }
        }
    }, [scrollPercent, breakpoint, ducksExpanded])

    return (
        <Section
            id="mint"
            title="Why to mint Ducks?"
            className={styles.wrapper}
        >
            <div
                className={styles.content}
                ref={contentRef}
            >
                <div className={styles.benefits}>
                    <div className={styles.star} />

                    <div className={styles['benefits-list']}>
                        <div className={styles.benefit}>
                            <span className={styles['benefit-num']}>01</span>

                            <p className={styles['benefit-text']}>
                                Exclusive access to the game platform
                            </p>
                        </div>

                        <div className={styles.benefit}>
                            <span className={styles['benefit-num']}>02</span>

                            <p className={styles['benefit-text']}>
                                Investing in launchpad for game developers providing future benefits
                            </p>
                        </div>

                        <div className={styles.benefit}>
                            <span className={styles['benefit-num']}>03</span>

                            <p className={styles['benefit-text']}>
                                Many upcoming bonuses for our community: merchandise, new drops, partnered rewards
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.mission}>
                    <svg
                        viewBox="0 0 567 485"
                        fill="none"
                        preserveAspectRatio="none"
                        className={styles['mission-border']}
                    >
                        <rect x="1" y="1" width="565" height="483" rx="21" stroke="url(#paint0_linear_60_7435)" strokeWidth="2" />

                        <defs>
                            <linearGradient id="paint0_linear_60_7435" x1="8.99999" y1="9.68588e-06" x2="684.814" y2="370.653" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#8670D2" />
                                <stop offset="0.526042" stopColor="#4A79E3" />
                                <stop offset="1" stopColor="#12BFD7" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className={missionDucksClassName}>
                        <img className={styles['mission-duck']} src="/mint/duck-green.png" alt="Duck green" />
                        <img className={styles['mission-duck']} src="/mint/duck-purple.png" alt="Duck purple" />
                        <img className={styles['mission-duck']} src="/mint/duck-blue.png" alt="Duck blue" />
                        <img className={styles['mission-duck']} src="/mint/duck-green.png" alt="Duck green" />
                        <img className={styles['mission-duck']} src="/mint/duck-purple.png" alt="Duck purple" />
                    </div>

                    <p className={styles['mission-text']}>
                        We are focused on the long-term development of the
                        project, so we have assembled a team of cool well-experienced
                        game developers. We believe that our project will be
                        valuable and profitable for our community.
                        <br />
                        <br/>
                        We are aiming to solve a problem of usability, game
                        search and content. Basically, there is currently
                        no aggregated platform on which the NEAR community
                        can play games from different projects yet.
                        <br />
                        <br/>
                        In addition, our project aims to help independent
                        game developers by providing them support through
                        our launchpad for games. The ZomboDucks launchpad
                        aims to encourage community growth and to improve
                        interactions between developers and gamers.
                    </p>
                </div>
            </div>
        </Section>
    )
}
