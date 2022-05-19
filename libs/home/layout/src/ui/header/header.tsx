import styles from './styles.module.scss'

import logo from './assets/logo.png'
import logoMob from './assets/logo_mob.png'
import { ReactComponent as Burger } from './assets/burger.svg';
import { Socials } from '../components/socials/socials'

export const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <img src={logo.src} alt="logo" />
            <img src={logoMob.src} alt="logo" />
          </div>
        </div>

        <div className={styles.other}>
          <div className={styles.menu}>
            <div className={styles.item}>About</div>
            <div className={styles.item}>How it Works</div>
            <div className={styles.item}>Game Center</div>
            <div className={styles.item}>Launchpad</div>
            <div className={styles.item}>WhitePaper</div>
            <div className={styles.item}>FAQ</div>
          </div>

          <Socials />

          <div className={styles.wallet}>Connect Wallet</div>
        </div>

        <Socials className={styles.socials} />

        <div className={styles.mobileMenu}>
          <Burger />
        </div>
      </div>
    </div>
  )
}
