import React from 'react'
import classnames from 'classnames/bind'

import { ReactComponent as WhiteA } from './assets/asteriskBlack.svg'
import { ReactComponent as BlackA } from './assets/asteriskWhite.svg'
import { ReactComponent as Pad } from './assets/gamepad.svg'
import { ReactComponent as LSlice } from './assets/GreenSlice.svg'
import { ReactComponent as RSlice } from './assets/PurpleSlice.svg'
import { ReactComponent as Tag } from './assets/TagBox.svg'

import styles from './Overview.module.scss'

const cn = classnames.bind(styles)

export const Overview = () => {
    return (
        <div className={cn('wrapper')}>
            <div className={cn('container')}>
                <div className={cn('title')}>
                    <div className={cn('title-content')}>overview</div>
                </div>
                <div className={cn('paragraph')}>
                    <div className={cn('paragraph-content')}>
                        We are the first P2E and GameFi platform based on NEAR
                        protocol, which will
                        <br />
                        aggregate different games made by us and our partners.
                        NFT is going to be the
                        <br />
                        essential part of every game and the way how we are
                        going to build a great product.
                    </div>
                </div>
                <div className={cn('cards')}>
                    <div className={cn('card-left', 'card')}>
                        <LSlice className={cn('lslice', 'slice')} />
                        <div className={cn('title-card', 'title-left')}>
                            Key benefits for <span>players:</span>
                        </div>
                        <Pad className={cn('title-icons', 'icon-left')} />
                        <div className={cn('p-list', 'p-left-list')}>
                            <div
                                className={cn(
                                    'p-l-item-1',
                                    'p-items',
                                    'p-l-item'
                                )}
                            >
                                <WhiteA
                                    className={cn('left-asterisk', 'asterisk')}
                                />
                                Earn by playing in cool indie and dendy games.
                            </div>
                            <div
                                className={cn(
                                    'p-l-item-2',
                                    'p-items',
                                    'p-l-item'
                                )}
                            >
                                <WhiteA
                                    className={cn('left-asterisk', 'asterisk')}
                                />
                                Get access to marketplace for trading in-game
                                NFT assets. Your time will never be wasted.
                            </div>
                            <div
                                className={cn(
                                    'p-l-item-3',
                                    'p-items',
                                    'p-l-item'
                                )}
                            >
                                <WhiteA
                                    className={cn('left-asterisk', 'asterisk')}
                                />
                                Participate in games and marketplace development
                                and even in platform profits sharing.
                            </div>
                        </div>
                    </div>
                    <div className={cn('card-right', 'card')}>
                        <RSlice className={cn('rslice', 'slice')} />
                        <div className={cn('title-card', 'title-right')}>
                            Key benifits for <span>developers:</span>
                        </div>
                        <Tag className={cn('title-icons', 'icon-right')} />
                        <div className={cn('p-list', 'p-right-list')}>
                            <div
                                className={cn(
                                    'p-r-item-1',
                                    'p-items',
                                    'p-r-item'
                                )}
                            >
                                <BlackA
                                    className={cn('right-asterisk', 'asterisk')}
                                />
                                Seamless solutions for game developers.
                            </div>
                            <div
                                className={cn(
                                    'p-r-item-2',
                                    'p-items',
                                    'p-r-item'
                                )}
                            >
                                <BlackA
                                    className={cn('right-asterisk', 'asterisk')}
                                />
                                Full technical support, including deploying your
                                games into blockchain.
                            </div>
                            <div
                                className={cn(
                                    'p-r-item-3',
                                    'p-items',
                                    'p-r-item'
                                )}
                            >
                                <BlackA
                                    className={cn('right-asterisk', 'asterisk')}
                                />
                                Open API and ready-to-go tool kit.
                            </div>
                            <div
                                className={cn(
                                    'p-r-item-4',
                                    'p-items',
                                    'p-r-item'
                                )}
                            >
                                <BlackA
                                    className={cn('right-asterisk', 'asterisk')}
                                />
                                Additional revenue streams and supportive
                                marketing campaign.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
