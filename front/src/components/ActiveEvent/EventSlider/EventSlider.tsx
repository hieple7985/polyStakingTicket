import React, { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import EventSliderItem from './EventSliderItem';
import LoadingField from '../../LoadingField/LoadingField';
import { EventInterface } from '../../../api/queries/getEvents';

interface Props {
  events: EventInterface[];
  loading: boolean;
}

const EventSlider: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
      {props.loading 
      ?
        <LoadingField />
      :
        <>
        {props.events.length > 0 && 
          <div id="ticket-slider-wrap">
            <Swiper
                slidesPerView={1.2}
                rewind={true}
                spaceBetween={15}
              >
                {props.events && props.events.map(event => (
                  <SwiperSlide key={event.id} >
                    <EventSliderItem event={event} />
                  </SwiperSlide>
                ))}
              </Swiper>
          </div>}
        </>  
      }
    </>
  )
}

export default memo(EventSlider)
