import React from 'react'
import classnames from 'classnames/bind'

import { WhyUsSlider } from '../components/slider/WhyUsSlider'

import { GetAccessButton } from './components/GetAccessButton'

import styles from './WhyUs.module.scss'

const cn = classnames.bind(styles)

export const WhyUs = () => {
    return (
        <div className={cn('wrapper')}>
            <div className={cn('container')}>
                <div className={cn('top-block')}>
                    <div className={cn('top-text-content')}>
                        <div className={cn('img')} />
                        <div className={cn('title')}>
                            <div className={cn('title-content')}>why us?</div>
                        </div>
                        <div className={cn('paragraph')}>
                            <div className={cn('paragraph-content')}>
                                The intersection of GameFi and NFT is how we
                                develop our philosophy and technologies built
                                <br /> specifically for gamers. In our gamer
                                marketplace, you can benefit from advanced
                                social and
                                <br />
                                engagement features. We also consider UI/UX to
                                be the most important part of our product,
                                <br /> providing easy access to features that
                                game users need.
                            </div>
                        </div>
                    </div>
                    <div className={cn('slider')}>
                        <WhyUsSlider />
                    </div>
                </div>
                <div className={cn('bottom-block')}>
                    <div className={cn('zomboDucks')}>
                        <div className={cn('top-zombo')}>
                            <div className={cn('title-zombo')}>ZomboDucks</div>
                            <div className={cn('top-right-zombo')}>
                                <div className={cn('p-zombo')}>
                                    Get a priority access to upcoming gaming
                                    platfrom
                                    <br /> and unlock premium experience and
                                    even more with
                                    <br /> ZomboDucks
                                </div>
                                <GetAccessButton />
                            </div>
                        </div>
                        <div className={cn('bottom-zombo')}>
                            <div className={cn('cards')}>
                                <div className={cn('card-img')}>
                                    <img
                                        src="/GDuck.png"
                                        className={cn('img-c', 'img-1')}
                                    />
                                </div>
                                <div className={cn('card-img')}>
                                    <img
                                        src="/PDuck.png"
                                        className={cn('img-c', 'img-2')}
                                    />
                                </div>
                                <div className={cn('card-img')}>
                                    <img
                                        src="/LPDuck.png"
                                        className={cn('img-c', 'img-3')}
                                    />
                                </div>
                                <div className={cn('card-img')}>
                                    <img
                                        src="/PLDuck.png"
                                        className={cn('img-c', 'img-4')}
                                    />
                                </div>
                                <div className={cn('card-img')}>
                                    <img
                                        src="/BDuck.png"
                                        className={cn('img-c', 'img-5')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
