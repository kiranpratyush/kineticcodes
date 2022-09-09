import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ImageSlider.css';
// import required modules
import { Autoplay, Pagination } from 'swiper';

export function ModalSliderImage(props) {
  return (
    <>
      <Swiper
      
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {props.images.map(({images}) => (
          <SwiperSlide>
            <img src={images} alt="modal"></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
