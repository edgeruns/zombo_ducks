import React, { useState } from 'react'
import styles from './HomePage.module.scss'
import classnames from 'classnames/bind'
import { ReactComponent as Near } from './assets/near.svg'
import { ReactComponent as Twit } from './assets/twitter.svg'
import { ReactComponent as Disc } from './assets/discord.svg'
import { ReactComponent as Burger } from './assets/burger.svg'
import { LeftButton } from '../components/buttons/LeftButton'
import { RightButton } from '../components/buttons/RightButton'
import { HomeSlider } from '../components/slider/HomeSlider'
import { HomeScroll } from '../components/slider/HomeScroll'

const cn = classnames.bind(styles)

export const HomePage = () => {
    const [isOpen, setOpen] = useState(false)

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={cn('header')}>
                    <img src="/logo.png" className={cn('logo')} />
                    <div className={cn('list', `${isOpen ? 'open' : ''}`)}>
                        <Burger
                            className={cn('burger', `${isOpen ? 'open' : ''}`)}
                            onClick={() => setOpen(!isOpen)}
                        />
                        <div className={cn('panel')}>
                            <a href="#" className={cn('items')}>
                                About
                            </a>
                            <a href="#" className={cn('items')}>
                                How it Works
                            </a>
                            <a href="#" className={cn('items')}>
                                Game Center
                            </a>
                            <a href="#" className={cn('items')}>
                                Launchpad
                            </a>
                            <a href="#" className={cn('items')}>
                                WhitePaper
                            </a>
                            <a href="#" className={cn('items')}>
                                FAQ
                            </a>
                        </div>
                    </div>
                    <div className={cn('social')}>
                        <div className={cn('social-icons')}>
                            <a href="#">
                                <Twit className={cn('twit', 'icons')} />
                            </a>
                            <a href="#">
                                <Disc className={cn('disc', 'icons')} />
                            </a>
                        </div>
                        <div className={cn('btn-wrapper')}>
                            <div className={cn('btn')}>Connect Wallet</div>
                        </div>
                    </div>
                </div>
                <div className={cn('content')}>
                    <div className={cn('text-content')}>
                        <div className={cn('head-text')}>
                            <div className={cn('powerby')}>Powered by</div>
                            <Near className={cn('near')} />
                        </div>
                        <div className={cn('side')}>
                            <div className={cn('left-side')}>
                                <div className={cn('title')}>
                                    the home of <span>games</span>
                                </div>
                                <div className={cn('paragraph')}>
                                    We are a decentralized Web 3.0 gaming
                                    marketplace
                                    <br />
                                    and launchpad. Play your favorite indie and
                                    dendy
                                    <br />
                                    games. Deploy games and monetize them.
                                </div>
                                <div className={cn('btns')}>
                                    <LeftButton />
                                    <RightButton />
                                </div>
                            </div>
                            <div className={cn('right-side')}>
                                <HomeSlider />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn('footer')}>
                <HomeScroll />
            </div>
        </div>
    )
}
