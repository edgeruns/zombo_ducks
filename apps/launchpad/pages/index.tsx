import classnames from 'classnames/bind'
import styles from './index.module.scss'
import { HomePage } from '../src/HomePage/HomePage'
import { Overview } from '../src/Overview/Overview'
import { WhyUs } from '../src/WhyUs/WhyUs'
import { RoadMap } from '../src/RoadMap/RoadMap'
import { Footer } from '../src/Footer/Footer'
import { MeetOurTeam } from '../src/MeetOurTeam/MeetOurTeam'

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

