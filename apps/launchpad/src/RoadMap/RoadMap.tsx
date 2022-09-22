import React from 'react'
import styles from './RoadMap.module.scss'
import classnames from 'classnames/bind'
import { ReactComponent as ABlack } from './assets/asteriskBlack.svg'
import { ReactComponent as AWhite } from './assets/asteriskWhite.svg'
import { ReactComponent as VectorGB } from './assets/vectorGreenBottom.svg'
import { ReactComponent as VectorGBR } from './assets/vectorGreenBottomRight.svg'
import { ReactComponent as VectorPB } from './assets/vectorPurpleBottom.svg'
import { ReactComponent as VectorP } from './assets/vectorPurple.svg'
import { ReactComponent as Arrow1 } from './assets/Arrow1.svg'
import { ReactComponent as Arrow2 } from './assets/Arrow2.svg'
import { ReactComponent as Arrow3 } from './assets/Arrow3.svg'
import { ReactComponent as Arrow4 } from './assets/Arrow4.svg'
import { ReactComponent as ArrowMob1 } from './assets/ArrowMob1.svg'
import { ReactComponent as ArrowMob2 } from './assets/ArrowMob2.svg'
import { ReactComponent as ArrowMob3 } from './assets/ArrowMob3.svg'
import { ReactComponent as ArrowMob4 } from './assets/ArrowMob4.svg'
import { ReactComponent as Bg1 } from './assets/Ellipse8.svg'
import { ReactComponent as Bg2 } from './assets/Ellipse9.svg'
import { ReactComponent as Bg3 } from './assets/Ellipse11.svg'
import { ReactComponent as Bg4 } from './assets/Ellipse13.svg'
import { ReactComponent as Bg5 } from './assets/Ellipse15.svg'

const cn = classnames.bind(styles)

export const RoadMap = () => {
    return (
        <div className={cn('wrapper')}>
            <div className={cn('container')}>
                <div className={cn('title')}>
                    <div className={cn('title-content')}>roadmap</div>
                </div>
                <div className={cn('roadmap')}>
                    <div className={cn('items', 'items-1')}>
                        <Bg1 className={cn('items-1-bg', 'bg')} />
                        <div className={cn('phase-content', 'phase-content-1')}>
                            <div className={cn('phase')}>
                                <ABlack className={cn('a-img')} /> Phase 1
                            </div>
                            <div className={cn('date')}>May 2022</div>
                            <VectorGB className={cn('Gb', 'vector')} />
                        </div>
                        <div className={cn('road-p', 'roadP')}>
                            <div className={cn('p-items')}>
                                – Presentation of our WhitePaper
                            </div>
                            <div className={cn('p-items')}>
                                – Beta version of the platform
                            </div>
                            <div className={cn('p-items')}>
                                – Active phase of marketing campaign
                            </div>
                        </div>
                        <Arrow1 className={cn('arrow', 'arrow-1')} />
                        <ArrowMob1 className={cn('arrowMob', 'arrowMob-1')} />
                    </div>
                    <div className={cn('items', 'items-2')}>
                        <Bg2 className={cn('items-2-bg', 'bg')} />
                        <div className={cn('phase-content', 'phase-content-2')}>
                            <div className={cn('phase')}>
                                <AWhite className={cn('a-img')} /> Phase 2
                            </div>
                            <div className={cn('date')}>June 2022</div>
                            <VectorPB className={cn('Vpb', 'vector')} />
                        </div>
                        <div className={cn('road-p')}>
                            <div className={cn('p-items')}>
                                – Onboard new game developers
                            </div>
                            <div className={cn('p-items')}>
                                – Launch of new partnered games
                            </div>
                            <div className={cn('p-items')}>
                                – In-game assets decentralised marketplace
                                launch
                            </div>
                        </div>
                        <Arrow2 className={cn('arrow', 'arrow-2')} />
                        <ArrowMob2 className={cn('arrowMob', 'arrowMob-2')} />
                    </div>
                    <div className={cn('items', 'items-3')}>
                        <Bg3 className={cn('items-3-bg', 'bg')} />
                        <div className={cn('phase-content', 'phase-content-3')}>
                            <div className={cn('phase')}>
                                <AWhite className={cn('a-img')} /> Phase 3
                            </div>
                            <div className={cn('date')}>July 2022</div>
                            <VectorP className={cn('Vp', 'vector')} />
                            <VectorPB className={cn('Vpb', 'vector')} />
                        </div>
                        <div className={cn('road-p')}>
                            <div className={cn('p-items')}>
                                – Direct in-game API integration
                            </div>
                            <div className={cn('p-items')}>
                                – Start of Seed / Private Round
                            </div>
                            <div className={cn('p-items')}>
                                – Moving to multi-chain by adding
                                <br /> a Polygon support
                            </div>
                        </div>
                        <Arrow3 className={cn('arrow', 'arrow-3')} />
                        <ArrowMob3 className={cn('arrowMob', 'arrowMob-3')} />
                    </div>
                    <div className={cn('items', 'items-4')}>
                        <Bg4 className={cn('items-4-bg', 'bg')} />
                        <div className={cn('phase-content', 'phase-content-4')}>
                            <div className={cn('phase')}>
                                <ABlack className={cn('a-img')} /> Phase 4
                            </div>
                            <div className={cn('date')}>August 2022</div>
                            <VectorGB className={cn('Gb', 'vector', 'Gb4')} />
                        </div>
                        <div className={cn('road-p', 'roadP')}>
                            <div className={cn('p-items', 'p-size')}>
                                – Launch of the governace forum and voting
                                mechanism
                            </div>
                            <div className={cn('p-items')}>
                                – Launch of a mobile-app
                            </div>
                        </div>
                        <Arrow4 className={cn('arrow', 'arrow-4')} />
                        <ArrowMob4 className={cn('arrowMob', 'arrowMob-4')} />
                    </div>
                    <div className={cn('items', 'items-5')}>
                        <Bg5 className={cn('items-5-bg', 'bg')} />
                        <div className={cn('phase-content', 'phase-content-5')}>
                            <div className={cn('phase')}>
                                <ABlack className={cn('a-img')} /> Phase 5
                            </div>
                            <div className={cn('date')}>September 2022</div>
                            <VectorGBR className={cn('Gbr', 'vector')} />
                        </div>
                        <div className={cn('road-p')}>
                            <div className={cn('p-items')}>
                                – Onboarding 30 games in total
                            </div>
                            <div className={cn('p-items')}>
                                – Public token sale
                            </div>
                            <div className={cn('p-items')}>
                                – Roadmap version 2.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
