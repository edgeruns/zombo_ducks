import styles from './overview.module.scss'
import { Title } from '@apps/home/uikit'
import { Benefit } from './components/benefit/benefit'

export const Overview = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Title>Overview</Title>
      </div>

      <div className={styles.description}>
        We are the first P2E and GameFi platform based on NEAR protocol, which
        will aggregate different games made by us and our partners. NFT is going
        to be the essential part of every game and the way how we are going to
        build a great product.
      </div>

      <div className={styles.benefits}>
        <Benefit variant="primary" />
        <Benefit variant="secondary" />
      </div>
    </div>
  )
}
