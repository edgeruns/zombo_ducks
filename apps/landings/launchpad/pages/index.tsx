import classnames from 'classnames/bind'

import { Footer } from '../src/Footer/Footer'
import { HomePage } from '../src/HomePage/HomePage'
import { MeetOurTeam } from '../src/MeetOurTeam/MeetOurTeam'
import { Overview } from '../src/Overview/Overview'
import { RoadMap } from '../src/RoadMap/RoadMap'
import { WhyUs } from '../src/WhyUs/WhyUs'

import styles from './index.module.scss'

const cn = classnames.bind(styles)

export function Index() {
    return (
        <div className={cn('container')}>
            <HomePage />
            <Overview />
            <WhyUs />
            <RoadMap />
            <MeetOurTeam />
            <Footer />
        </div>
    )
}

export default Index
