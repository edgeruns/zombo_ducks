import { FC } from 'react';
import classNames from 'classnames/bind';

import { Button } from '@apps/home/uikit'

import { ReactComponent as Logo } from './assets/logo.svg';
import { ReactComponent as PrimaryBlob } from './assets/primary_btn_blob.svg';
import { ReactComponent as SecondaryBlob } from './assets/secondary_btn_blob.svg';

import styles from './promo.module.scss'

interface PromoProps {
  className?: string
}

const cx = classNames.bind(styles)


export const Promo: FC<PromoProps> = ({ className }) => {
  return (
    <div className={cx('root', className)}>
      <div className={styles.powered}>
        <div className={styles.name}>powered by</div>
        <Logo className={styles.logo} />
      </div>

      <div className={styles.title}>
        The home of <span className={styles.purple}>games</span>
      </div>

      <div className={styles.description}>
        We are a decentralized Web 3.0 gaming marketplace and launchpad. Play
        your favorite indie and dendy games. Deploy games and monetize them.
      </div>

      <div className={styles.actions}>
        <Button variant="primary" className={styles.launch}>
          <PrimaryBlob className={styles.blob} />
          Launch App
        </Button>
        <Button variant="secondary" className={styles.apply}>
          <SecondaryBlob className={styles.blob} />
          Apply for Listing
        </Button>
      </div>
    </div>
  )
}
