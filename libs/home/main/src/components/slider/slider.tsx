import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectCards } from 'swiper'

import styles from './slider.module.scss'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'


export const Slider = () => {

  return (
    <div className={styles.root}>
      <Swiper
        effect="cards"
        grabCursor
        cardsEffect={{
          rotate: true,
        }}
        loop
        pagination={{
          dynamicBullets: true
        }}
        autoplay={{
          delay: 2500,
        }}
        modules={[EffectCards, Autoplay, Pagination]}
      >
        <SwiperSlide>
          <img src="/game_1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/game_2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/game_3.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
