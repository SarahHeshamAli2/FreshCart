import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function EmptyWish() {

   const navigate = useNavigate()
    return<>
    
    <div className=' d-flex justify-content-center'>
        <img src={require("../../images/wishlist-smartphone-app-gift-shopping-list-tiny-woman-writing-down-wishes_501813-875.jpg")} className='w-50' alt="" />

    </div>
    <div className='text-center m-0'>
    <p  className=' fs-4  text-danger fw-bolder'>Your wishlist is empty !</p>
    <p className='fw-bolder'>Make a wish!</p>
    <button onClick={function(){navigate("/")}} className='btn btn-outline-primary'>Start Shopping</button>
    </div>
    
    </>
}
