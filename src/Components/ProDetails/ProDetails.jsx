import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { useNavigate, useParams } from 'react-router-dom'
import "./prodetails.css"
import { cartStore } from '../../Context/CartStore'
import $ from "jquery"
import Slider from "react-slick"
export default function ProDetails() {
;
const [proDetail, setproDetail] = useState(null)
const [allImages, setallImages] = useState([])
const id = useParams()
const {addProductToCart,isLoad,cartData,deleteItemFromCart,addToWhishList,Lo} = useContext(cartStore)


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 3,

  }



if (isLoad==true)



{
$(".showedCheckOutDetails").fadeIn(2000)
$(".add-btn").fadeOut(1000)




}

 const navigate = useNavigate()
function getImgSrc( e) {

    let imgSrc = e

    document.getElementById("myimage").setAttribute("src" , imgSrc)
}
async function getProductDetails() {

const {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id.id}`)
    setproDetail(data.data)
    setallImages(data.data.images)

}

if (isLoad == true ) {
$(".loading-btn").fadeIn(500)
}
useEffect(function(){

getProductDetails()

},[])

function hideDetailWindow()
 {
$(".showedCheckOutDetails").hide()
$('.add-btn').fadeIn(500)


 }
function navigateToHome () {

    navigate("/")
}


function navigateToCart () {
    navigate("/cart")
}

  return <>

  
    
    {proDetail? <div className="container my-4 my-5 py-5">
        <div className="row align-items-center position-relative">
            <div className="col-md-3">
                <div className="inner-col ">
                    
                      <Slider>
                        {allImages?.map((img,index)=>
                    
                         <img src={img} alt=""  key={index} className='img-item rounded-2' />
                     
                     )} </Slider>
                </div>
            </div>
            <div className="col-md-9 position-relative hiden-sec">
                <div className="inner-col">
                    <h2>{proDetail.title}</h2>
                    <p>{proDetail.description}</p>
                    <p>Price: <span className='text-primary fw-bolder'>{proDetail.price}</span> EGP</p>
                    <p>Quantity: {proDetail.quantity}</p>
                    <p>Rate: {proDetail.ratingsAverage}</p>
                    <p className=' love-btn' onClick={function(){addToWhishList(proDetail._id)}}> <i  className="fa-solid fa-heart text-secondary mx-2 cursor-pointer"></i></p>
                    {isLoad? <button  className='btn btn-success w-100 loading-btn' type='button' ><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> :                      <button className='btn btn-success w-100 add-btn' onClick={function(){addProductToCart(proDetail._id)}}>Add to cart</button>

                    

}   
   
<div>

</div>

                </div>
            </div>

    <p style={{display:"none"}}  className='alert alert-success position-absolute top-50 w-25 suc'> Product added to wishList</p>



            <div className='showedCheckOutDetails  p-4 rounded-2 w-50 position-absolute top-0 end-0' style={{display:"none"}}  >
            <i className="fa-solid fa-x float-end cursor-pointer" onClick={hideDetailWindow}></i>
    <h4>{proDetail.title}</h4>
    <div className='d-flex align-items-center'>
    {isLoad? <i className="fa-solid fa-spinner mx-2 fs-4 fa-spin"></i> :  <i className="fa-solid fa-circle-check mx-2 fs-4 "></i>}
   
    <p className='text-success m-0'>Added to cart</p>
  
    </div>
    <div className='d-flex justify-content-between chckOut align-items-center px-3 rounded-3 pt-2'>
        <div className="cartTotal my-2">
            <p>Cart Total</p>
        </div>
        <div className="Total">
        {isLoad?  <i className="fa-solid fa-spinner fa-spin  mt-3"></i> : cartData.totalCartPrice}
           
        </div>
    </div>
    <button className='btn btn-outline-primary w-100 ' onClick={navigateToHome}>Continue Shopping</button>
    <button className='btn btn-primary w-100 my-3' onClick={ navigateToCart}>View Cart</button>
    <button className='btn btn-danger w-100' onClick={function(){deleteItemFromCart(proDetail.id)}}>Remove Item</button>
  



    </div>
        </div>
    </div>:<Loading/>}
  
  </>
}
