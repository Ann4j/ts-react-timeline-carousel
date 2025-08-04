import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { TimelineEvent } from '../../data/timelineData'
import 'swiper/css'
import 'swiper/css/navigation'
import * as styles from './TImelineSlider.module.scss'

interface TimelineSliderProps {
  events: TimelineEvent[]
  slidesPerView?: number | 'auto'
  loop?: boolean
}

export function TimelineSlider({ events }: TimelineSliderProps) {
  return (
    <div className={styles.slider}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={'auto'}
        breakpoints={{
          320: {
            spaceBetween: 20
          },
          640: {
            spaceBetween: 25
          },
          1024: {
            spaceBetween: 80
          }
        }}
        loop={false}
        navigation
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
