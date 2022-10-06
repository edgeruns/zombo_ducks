import React, { useEffect, useState } from 'react'
import classnames from 'classnames/bind'
import styles from './WhyUsSlider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

const cn = classnames.bind(styles)

import 'swiper/css'
import 'swiper/css/navigation'

export const WhyUsSlider = () => {
    const [isInfinity, setInfinity] = useState(false)

    useEffect(() => {
        setInfinity(true)
    }, [])

    return (
        <div className={cn('slide')}>
            <Swiper
                style={{ overflow: 'inherit' }}
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={0}
                // loop={isInfinity}
                navigation
                breakpoints={{
                    1280.1: {
                        spaceBetween: 50,
                        slidesPerView: 2,
                    },
                    425.1: {
                        spaceBetween: 0,
                        slidesPerView: 1,
                    },
                    320: {
                        spaceBetween: 0,
                        slidesPerView: 1,
                    },
                }}
            >
                <SwiperSlide className={cn('bottom')}>
                    <img src="/1.png" alt="" className={cn('imgs')} />
                </SwiperSlide>
                <SwiperSlide className={cn('bottom')}>
                    <img src="/2.png" alt="" className={cn('imgs')} />{' '}
                </SwiperSlide>
                <SwiperSlide className={cn('bottom')}>
                    <img src="/3.png" alt="" className={cn('imgs')} />{' '}
                </SwiperSlide>
                <SwiperSlide className={cn('bottom')}>
                    <img src="/4.png" alt="" className={cn('imgs')} />{' '}
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
