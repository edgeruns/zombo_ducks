import { Header } from './header/header';
import { FC } from 'react';
import { Footer } from './footer/footer';
import styles from './layout.module.scss'
import bgDucks from './assets/bg_ducks.png'

import cn from 'classnames'

export const Layout: FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />

      <div className={styles.blurs}>
        <div className={cn(styles.blur, styles.overview_1)} />
        <div className={cn(styles.blur, styles.overview_2)} />
        <div className={styles.bgDucks}>
          <img src={bgDucks.src} alt="" />
        </div>
      </div>
    </>
  )
}
