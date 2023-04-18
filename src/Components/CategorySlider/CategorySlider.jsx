import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick"
import "./categorySlider.css"
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  }
  
export default function CategorySlider() {

    const [categorySlider, setCategorySlider] = useState([])
     async function getCategorySlider() {
          const {data}=await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
            setCategorySlider(data.data)

    }
    useEffect(function(){

        getCategorySlider()

    },[])
return <>

<div className='container my-5 slid'>
    <h4 className='fw-bolder'>Shop popular categories</h4>
    <div className="row">
        <div className="col-md-12">
        <Slider {...settings} className='w-100 my-5'>
{categorySlider.map((catg,ind)=>  
       <div key={ind}> <img src={catg.image} className='w-100' height={250} alt="" />
       <h2 className='h6 py-3 text-center'> {catg.name}</h2>
       
       </div>
     )}


</Slider>
        </div>
    </div>

</div>


</>
}
