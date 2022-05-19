import { Promo } from './components/promo/promo'
import { Slider } from './components/slider/slider'

import styles from './main.module.scss'
import { InfinityImages } from './components/infinity/infinity'

export const Main = () => {
  return (
    <>
      <div className={styles.root}>
        <Promo className={styles.promo} />
        <Slider />
      </div>
      <InfinityImages />
    </>
  )
}
