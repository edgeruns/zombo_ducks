import React from 'react'
import styles from './Footer.module.scss'
import classnames from 'classnames/bind'
import { ReactComponent as Near } from './assets/near.svg'
import { ReactComponent as Twit } from './assets/twitter.svg'
import { ReactComponent as Disc } from './assets/discord.svg'
import { ReactComponent as Up } from './assets/up.svg'

const cn = classnames.bind(styles)

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <div className={cn('wrapper')}>
            <div className={cn('container')}>
                <div className={cn('content')}>
                    <div className={cn('footer-protocol')}>
                        <Near className={cn('near')} />
                        <div className={cn('footer-text')}>
                            © 2022 ZomboDucks. Powered by
                            <br />
                            NEAR protocol. All rights reserved.
                        </div>
                    </div>
                    <div className={cn('footer-social')}>
                        <a href='#'>
                            <Disc className={cn('social-icons', 'disc')} />
                        </a>
                        <a href='#'>
                            <Twit className={cn('social-icons', 'twit')} />
                        </a>
                    </div>
                    <div className={cn('to-top')} onClick={scrollToTop}>
                        Back to the top
                        <Up className={cn('up')} />
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}
