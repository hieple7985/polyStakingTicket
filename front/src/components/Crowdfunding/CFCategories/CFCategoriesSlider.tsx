import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';

import '../../CategorySlider/CategorySlider.css'
import crowdfundingCategories from '../../../data/crowdfundingCategories';
import { toTitleCase } from '../../../util/FormatStringToTitle';

interface Props {
  cfStatus: number;
  setCFStatus: React.Dispatch<React.SetStateAction<number>>;
}

const CFCategoriesSlider: React.FC<Props> = ({cfStatus, setCFStatus}: Props): React.ReactElement => {

  const handleClick = (category: number): void => {
    setCFStatus(category);
  }

  return (
    <div id="category-slider-wrap">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={15}
      >
        {crowdfundingCategories.map(cfCate => (
          <SwiperSlide
            key={cfCate.id}
            className={`category-btn ${cfStatus === cfCate.id ? 'active' : ''}`} 
            onClick={() => handleClick(cfCate.id)}
          >
            {toTitleCase(cfCate.name)}
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CFCategoriesSlider