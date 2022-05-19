import classNames from 'classnames';
import { ReactComponent as Twitter } from './assets/twitter.svg';
import { ReactComponent as Discord } from './assets/discord.svg';
import styles from './socials.module.scss'

export interface SocialsProps {
  className?: string
}

export const Socials = ({ className }: SocialsProps) => {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={classNames('item', styles.item, styles.socItem)}>
        <Twitter className={styles.twitter} />
      </div>
      <div className={classNames('item', styles.item, styles.socItem)}>
        <Discord className={styles.discord} />
      </div>
    </div>
  )
}
