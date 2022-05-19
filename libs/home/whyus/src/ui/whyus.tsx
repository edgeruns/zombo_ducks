import styles from './whyus.module.scss'
import { Title } from '@apps/home/uikit'
import { Slider } from './components/slider/slider';

export const WhyUs = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Title>Why us?</Title>
      </div>

      <div className={styles.description}>
        The intersection of GameFi and NFT is how we develop our philosophy and
        technologies built specifically for gamers. In our gamer marketplace,
        you can benefit from advanced social and engagement features. We also
        consider UI/UX to be the most important part of our product, providing
        easy access to features that game users need.
      </div>

      <Slider />
    </div>
  )
}
