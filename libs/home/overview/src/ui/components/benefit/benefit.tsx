import classNames from 'classnames/bind'
import styles from './benefit.module.scss'
import { FC } from 'react'
import { ReactComponent as Game } from './assets/game.svg'
import { ReactComponent as Dev } from './assets/dev.svg'
import { ReactComponent as PrimaryBlob } from './assets/p_blob.svg'
import { ReactComponent as SecondaryBlob } from './assets/s_blob.svg'

const cx = classNames.bind(styles)

interface BenefitProps {
  className?: string
  variant: 'primary' | 'secondary'
}

export const Benefit: FC<BenefitProps> = ({ className, variant }) => {
  const rootClass = cx(styles.root, className, {
    primary: variant === 'primary',
    secondary: variant === 'secondary',
  })

  return (
    <div className={rootClass}>
      <div className={styles.header}>
        <div className={styles.title}>
          key benefits for{' '}
          <span>{variant === 'primary' ? 'players' : 'developers'}:</span>
        </div>

        <div className={styles.icon}>
          {variant === 'primary' ? <Game /> : <Dev />}
        </div>
      </div>

      <div className={styles.list}>
        {variant === 'primary' ? (
          <>
            <div className={styles.item}>
              Earn by playing in cool <br />
              indie and dendy games.
            </div>
            <div className={styles.item}>
              Get access to marketplace <br />
              for trading in-game NFT assets. Your time will never be wasted.
            </div>
            <div className={styles.item}>
              Participate in games and marketplace development <br />
              and even in platform profits sharing.
            </div>
          </>
        ) : (
          <>
            <div className={styles.item}>
              Seamless solutions <br /> for game developers.
            </div>
            <div className={styles.item}>
              Full technical support, including <br />
              deploying your games into blockchain.
            </div>
            <div className={styles.item}>
              Open API and ready-to-go tool kit.
            </div>
            <div className={styles.item}>
              Additional revenue streams and <br />
              supportive marketing campaign.
            </div>
          </>
        )}
      </div>

      {variant === 'primary' ? (
        <PrimaryBlob className={styles.blob} />
      ) : (
        <SecondaryBlob className={styles.blob} />
      )}
    </div>
  )
}
