import React, { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import CFEventItem from './CFEventItem';
import { CFEventInterface } from '../../../api/queries/getCFEvent';

interface Props {
  cfEvents: CFEventInterface[];
}

const CFEventSlider: React.FC<Props> = ({cfEvents}: Props): React.ReactElement => {
  return (
    <div id="cf-event-slider-wrap" className='mt-6'>
      {cfEvents.length > 0 &&
        <Swiper
          slidesPerView={1.2}
          rewind={true}
          spaceBetween={15}
        >
          {cfEvents.map(cfEvent => (
            <SwiperSlide key={cfEvent.id}>
              <CFEventItem cfEvent={cfEvent}/>
            </SwiperSlide>
          ))}
        </Swiper>
      }
    </div>
  )
}

export default memo(CFEventSlider)