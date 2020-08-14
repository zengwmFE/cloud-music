import React, { useEffect, useState } from 'react'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
import { SliderContainer } from './style'
function Slider(props) {
  const { bannerList } = props
  const [sliderSwiper, setSliderSwiper] = useState(null)
  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination', type: 'bullets' },
      })
      setSliderSwiper(newSliderSwiper)
    }
  }, [bannerList, sliderSwiper])
  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider) => (
            <div className="swiper-slide" key={slider.imageUrl}>
              <div className="slider-nav">
                <img
                  src={slider.imageUrl}
                  alt="推荐图"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)
