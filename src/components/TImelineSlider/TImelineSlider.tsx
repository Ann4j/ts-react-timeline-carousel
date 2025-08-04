import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { TimelineEvent } from '../../data/timelineData'
import 'swiper/css'
import 'swiper/css/navigation'
import * as styles from './TImelineSlider.module.scss'

interface TimelineSliderProps {
  events: TimelineEvent[]
  slidesPerView?: number | 'auto'
  spaceBetween?: number
  navigation?: boolean
  loop?: boolean
}

export function TimelineSlider({
  events,
  slidesPerView = 1,
  spaceBetween = 50,
  navigation = true,
  loop = false
}: TimelineSliderProps) {
  const swiperModules = []

  if (navigation) swiperModules.push(Navigation)

  return (
    <div className={styles.slider}>
      <Swiper
        modules={swiperModules}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop={loop}
        navigation={navigation}
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
