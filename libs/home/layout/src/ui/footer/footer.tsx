import styles from './styles.module.scss'
import { Socials } from '../components/socials/socials'
import { ReactComponent as Logo } from './assets/logo.svg'
import { ReactComponent as ToTop } from './assets/top.svg'

export const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <div className={styles.logo}>
              <Logo />
            </div>

            <div className={styles.text}>
              © 2022 ZomboDucks. Powered by <br /> NEAR protocol. All rights
              reserved.
            </div>
          </div>

          <Socials className={styles.socials} />

          <div className={styles.toTop}>
            <span>Back to the top</span>
            <ToTop />
          </div>
        </div>
      </div>
    </div>
  )
}
