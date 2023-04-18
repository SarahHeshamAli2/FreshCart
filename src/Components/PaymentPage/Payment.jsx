import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartStore } from '../../Context/CartStore';
import { useNavigate } from 'react-router-dom';
import $ from "jquery"
import master from '../../images/mastercard-color.svg'
import amx from "../../images/amex-color.svg"
import visa from "../../images/visa-color-v2.png"
export default function Payment() {



    const navigate=useNavigate()
const {cartId}= useContext(cartStore)
const [loading, setLoading] = useState(false)
const [loader , setLoader] = useState(false)

async function cashOrder() {
    try {
        setLoading(true)
       
        const {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${localStorage.getItem("cartId")}`, {

        "shippingAddress":{
          "details": document.querySelector("#address").value,
          "phone": document.querySelector("#phone").value,
          "city": document.querySelector("#city").value
          }
        }  , { "headers":{"token":localStorage.getItem("userToken")}})



        if(data.status == "success") {
            $(".suc-message").fadeIn(500,function(){
                setTimeout(() => {
                  
                }, 1000);
            })

            
        }
     

        console.log(data);
 
        setLoading(false)
   
    } catch (error) {
        console.log("error:",error.response.data);
    }
}



async function creditOrder () {
    setLoader(true)

try {
    const {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${localStorage.getItem("cartId")}/` , {

    "shippingAddress":{
        "details": document.querySelector("#address").value,
        "phone": document.querySelector("#phone").value,
        "city": document.querySelector("#city").value
        }

    } ,{ params: {"url":"http://localhost:3000"},
     headers:{"token" : localStorage.getItem("userToken")}}   )
    if (data.status=="success") {
        window.open(data.session.url)
    }
    setLoader(false)

} catch (error) {
    console.log("error:",error);
}



}






 return<>
  <div className="container w-50 m-auto my-5 py-5">
    <form >
    <label className='my-2' htmlFor="address">Address details</label>
    <input id='address' type="text" className='form-control' placeholder='street name / building name' />
    <label className='my-2' htmlFor="phone">Phone Number</label>
    <input id='phone' type="text" className='form-control' placeholder='e.g. 1xxxxxxxxxx'/>
    <label className='my-2' htmlFor="city">City/Area</label>
    <input id='city' type="text" placeholder='e.g. Dokki / New cairo' className='form-control'/>
    <div style={{display:'none'}} className='fw-bolder my-3'>Please wait..</div> 

    {loading  ?<button className='btn btn-primary ' type='button'> <i className="fa-solid fa-spinner fa-spin  fs-1 "></i></button> :     <button onClick={function(){cashOrder()}} type='button' className='btn btn-primary my-2'>Cash On Delivery</button>}
    <div className='d-flex justify-content-between align-items-center'>
       <div className="inner">
       {loader?<button className='btn btn-primary ' type='button'> <i className="fa-solid fa-spinner fa-spin  fs-1 "></i></button>    :  <button onClick={creditOrder} type='button' className='btn btn-primary my-2'>Pay with card</button>}

       </div>
       <div className="right-payment">
        <img src={visa} alt="" width={50}/>
       <img src={master} alt="" className='mx-3'/>
       <img src={amx} alt="" />
       </div>

    </div>
    <div style={{display:"none"}} className="alert alert-success suc-message">
        <p>Your Order is Confirmed !</p>
          <button onClick={function(){navigate("/")}} className=' btn btn-success btn-sm'>Continue shopping</button>
    </div>
   

    </form>
 </div>
 
 
 
 
 


 
 
 
 
 </>
}
