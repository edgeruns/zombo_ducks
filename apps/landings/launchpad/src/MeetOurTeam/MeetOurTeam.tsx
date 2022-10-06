import React from 'react'
import styles from './MeetOurTeam.module.scss'
import classnames from 'classnames/bind'
import { ReactComponent as VecLeft } from './assets/vecLeft.svg'
import { ReactComponent as VecCenter1 } from './assets/vecCenter1.svg'
import { ReactComponent as VecCenter2 } from './assets/vecCenter2.svg'
import { ReactComponent as VecRight } from './assets/vecRight.svg'

const cn = classnames.bind(styles)

export const MeetOurTeam = () => {
    return (
        <div className={cn('wrapper')}>
            <div className={cn('container')}>
                <div className={cn('title')}>
                    <div className={cn('title-content')}>Meet our team</div>
                </div>
                <div className={cn('ducks')}>
                    <div className={cn('duck-content', 'content-s-l')}>
                        <img
                            src="/leftDuck.png"
                            className={cn('duck', 'duck-s')}
                        />
                        <div className={cn('duck-text')}>
                            <div className={cn('duck-title')}>ZomboMaster</div>
                            <div className={cn('duck-p')}>
                                Creative director, content manager
                                <br /> and PR in one bottle
                            </div>
                        </div>
                        <VecLeft className={cn('vec-left', 'vec')} />
                    </div>
                    <div className={cn('duck-content', 'content-l')}>
                        <img
                            src="/centralDuck1.png"
                            className={cn('duck', 'duck-l')}
                        />
                        <img
                            src="/centralDuck2.png"
                            className={cn('duck', 'duck-l', 'd-l-r')}
                        />
                        <div className={cn('duck-text')}>
                            <div className={cn('duck-title', 't-l')}>
                                ZomboDonald x ZomboWilly
                            </div>
                            <div className={cn('duck-p', 'p-l')}>
                                Our star developers with experience in leading
                                <br /> game studios, masters of their craft
                            </div>
                        </div>
                        <VecCenter1 className={cn('vec-center1', 'vec')} />
                        <VecCenter2 className={cn('vec-center2', 'vec')} />
                    </div>
                    <div className={cn('duck-content', 'content-s-r')}>
                        <img
                            src="/rightDuck.png"
                            className={cn('duck', 'duck-s')}
                        />
                        <div className={cn('duck-text')}>
                            <div className={cn('duck-title')}>ZomboCalypse</div>
                            <div className={cn('duck-p')}>
                                God of numbers and strategy,
                                <br /> handyman
                            </div>
                        </div>
                        <VecRight className={cn('vec-right', 'vec')} />
                    </div>
                </div>
            </div>
        </div>
    )
}
