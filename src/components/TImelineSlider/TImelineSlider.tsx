import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules'
import { TimelineEvent } from '../../data/timelineData'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import * as styles from './TImelineSlider.module.scss'

interface TimelineSliderProps {
  events: TimelineEvent[]
  slidesPerView?: number | 'auto'
  spaceBetween?: number
  navigation?: boolean
  pagination?: boolean
  scrollbar?: boolean
  loop?: boolean
  autoplay?: boolean
  autoplayDelay?: number
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  events,
  slidesPerView = 1,
  spaceBetween = 30,
  navigation = true,
  pagination = true,
  scrollbar = false,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000
}) => {
  const swiperModules = []

  if (navigation) swiperModules.push(Navigation)
  if (pagination) swiperModules.push(Pagination)
  if (scrollbar) swiperModules.push(Scrollbar)
  if (autoplay) swiperModules.push(Autoplay)

  return (
    <div className={styles.slider}>
      <Swiper
        modules={swiperModules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        scrollbar={scrollbar ? { draggable: true, hide: false } : false}
        autoplay={autoplay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        className={styles.slider__container}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index} className={styles.slider__slide}>
            <div className={styles.event}>
              <h3 className={styles.event__year}>{event.year}</h3>
              <p className={styles.event__description}>{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
