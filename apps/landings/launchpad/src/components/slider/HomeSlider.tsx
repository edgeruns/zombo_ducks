import React, { useEffect, useState } from 'react'

import classnames from 'classnames/bind'
import styles from './HomeSlider.module.scss'

const cn = classnames.bind(styles)

import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'

export const HomeSlider = () => {
    const [isInfinity, setInfinity] = useState(false)

    useEffect(() => {
        setInfinity(true)
    }, [])

    return (
        <div className={cn('slide')}>
            <Swiper
                className={cn('swiper-home')}
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={0}
                loop={isInfinity}
                pagination={{ clickable: true }}
                breakpoints={{
                    1280.1: {
                        spaceBetween: 50,
                        slidesPerView: 2,
                    },
                    425.1: {
                        spaceBetween: 15,
                        slidesPerView: 2,
                    },
                    320: {
                        spaceBetween: 0,
                        slidesPerView: 1,
                    },
                }}
            >
                <SwiperSlide className={cn('top')}>
                    <img src="/1.png" alt="" className={cn('imgs')} />
                </SwiperSlide>
                <SwiperSlide className={cn('top')}>
                    <img src="/2.png" alt="" className={cn('imgs')} />
                </SwiperSlide>
                <SwiperSlide className={cn('top')}>
                    <img src="/3.png" alt="" className={cn('imgs')} />
                </SwiperSlide>
                <SwiperSlide className={cn('top')}>
                    <img src="/4.png" alt="" className={cn('imgs')} />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
