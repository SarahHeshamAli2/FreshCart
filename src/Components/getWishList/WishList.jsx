import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import NoItems from '../NoItems/NoItems';
import { Link, useNavigate } from 'react-router-dom';
import $ from "jquery"
import { cartStore } from '../../Context/CartStore';
import Loading from '../Loading/Loading';
import EmptyWish from '../EmptyWish/EmptyWish';

export default function WishList() {
 const navigate =useNavigate()
    
    useEffect(()=>{
        getWhishList()
    },[])


    const{isLoad,addProductToCart,addToWhishList,deleteFromWishList,getWhishList,wishList}=useContext(cartStore)


    
  return <> 
    {wishList ? <div className="container my-5">
   
        {isLoad ? <i className="fa-solid fa-spinner fa-spin  fs-1 "></i>: <div className="row g-5 position-relative">
       {wishList.length == 0 ? <EmptyWish/> : wishList?.map((pro,indx)=>     < div className="col-md-4 col-5 hover-quick position-relative" key={indx}>
       <Link to={`/prodetails/${pro.id}`} className='text-decoration-none '>
       <div className="inner-col ">
         <div>
           <div>
            <img src={pro.imageCover} className='w-100 my-3 bg-secondary ' />
               <p className='ctg-name '>{pro.category?.name}</p>
               <h6 className='fw-bolder'>{pro.title?.slice(0,pro.title.indexOf(' ', 8)) } </h6>
               <div className='mt-2'>{pro.priceAfterDiscount? <div><span className='text-decoration-line-through'>{pro.price}  </span> <span className='text-danger ms-2'>{ pro.priceAfterDiscount} EGP</span> </div>: <span>{pro.price} EGP</span> }</div>

            </div>
               <div className="rating d-flex justify-content-end align-items-center">
               <i className="fa-solid fa-star"></i>
                   <p className='rate'>{pro.ratingsAverage}</p>
               </div>
         </div>

           </div>
   </Link>
    <button onClick={function(){deleteFromWishList(pro._id)}} className='btn btn-danger '>Remove item from wishlist</button>






       </div>)}
      
   
   </div>}
</div> : <Loading/>}
  
<div style={{display:"none"}} className='alert alert-danger position-absolute top-50 rm-ms'>Item removed !</div>

  </>
}
