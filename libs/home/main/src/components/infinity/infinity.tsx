import styles from './infinity.module.scss'
import card1 from './assets/1.png'
import card2 from './assets/2.png'
import card3 from './assets/3.png'
import card4 from './assets/4.png'
import card5 from './assets/5.png'
import card6 from './assets/6.png'

const cards = [
  card1.src,
  card2.src,
  card3.src,
  card1.src,
  card4.src,
  card5.src,
  card6.src,
  card5.src,
  card6.src,
  card1.src,
  card2.src,
  card3.src,
  card1.src,
  card4.src,
  card5.src,
  card6.src,
  card5.src,
  card6.src,
]

export const InfinityImages = () => {
  return (
    <div className={styles.root}>
      <div className={styles.cards}>
        {cards.map((card, key) => (
          <div className={styles.card} key={key}>
            <img src={card} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}
