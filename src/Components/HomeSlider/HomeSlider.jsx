import React from 'react'
import Slider from "react-slick"

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 3
  }
export default function HomeSlider() {

return<>



<div>

      <div className="container my-5 slid py-5">
      <Slider {...settings}>
          
          <img src={require("../../images/slider-image-3.jpeg")} alt="" height={500} className='w-100'/>
       
 
      <div>
      <img src={require("../../images/slider-image-2.jpeg")} alt="" height={250} className='w-100'/>

       
        
<img src={require("../../images/slider-image-1.jpeg")} alt="" height={250} className='w-100'/>
      </div>
        
          <img src={require("../../images/slider-image-3.jpeg")} alt="" height={500} className='w-100'/>
       
 
      <div>
      <img src={require("../../images/slider-image-2.jpeg")} alt="" height={250} className='w-100'/>

       
        
<img src={require("../../images/slider-image-1.jpeg")} alt="" height={250} className='w-100'/>
      </div>
       
      
 
      </Slider>
      </div>
      </div>

</>
}
