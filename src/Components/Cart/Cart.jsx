import React, { useContext, useEffect } from 'react'
import CartStoreProvider, { cartStore } from '../../Context/CartStore'
import Loading from '../Loading/Loading'
import $ from "jquery"
import EmptyCart from '../EmptyCart/EmptyCart'
import { Link } from 'react-router-dom'
export default function Cart({currentUser}) {
 const{numberOfCartItems,totalCartPrice,cartProducts,deleteItemFromCart,getCartProducts, updateCartProducts,isLoad}=useContext(cartStore)





  async function getCart() {
  
     await getCartProducts()

 }
 
 function setUpdateCart(id , count,e) {
    updateCartProducts(id,count)
   
 }

useEffect(function() {

getCart()


},[])

    return <> 

    {cartProducts ? 
    
    <div className="container my-5 py-5 ">

{  numberOfCartItems <=0 ? <EmptyCart/> :"" }


<div className="inner-price  float-end w-25 position-sticky  lgScreen">
      <h5 className='fw-bolder'>Order summary</h5>
      <h6 className='my-4'>Subtotal ({numberOfCartItems} items)</h6>
      <h6 className='fw-bolder my-3'> Total <span className='price text-muted'>(Inclusive of VAT)</span>  : {totalCartPrice} EGP</h6>
      <Link to="/payment"> <button className='btn btn-primary w-100'>CHECKOUT</button></Link>
  </div>


<div className="btn-group float-end position-sticky top-0 dropDetails " style={{display:"none"}}>
  <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      order details
  </button>
  <ul className="dropdown-menu">
  <div className="inner-price w-100 ">
      <h5 className='fw-bolder'>Order summary</h5>
      <h6 className='my-4'>Subtotal ({numberOfCartItems} items)</h6>
      <h6 className='fw-bolder my-3'> Total <span className='price text-muted'>(Inclusive of VAT)</span>  : {totalCartPrice} EGP</h6>
      <Link to="/payment"> <button className='btn btn-primary w-100'>CHECKOUT</button></Link>
  </div>

  </ul>
</div>
    

  

   {cartProducts.map((pro,indx)=>  <div className="row align-items-center border-bottom py-2 my-2" key={indx}>
   <div className="col-md-2 col-6 p-0">

<img src={pro.product.imageCover} alt=""  className='w-100'/>
</div>     
<div className="col-md-10 col-6 ">
        <div className="left">
        <h6>
       {pro.product.title?.slice(0,pro.product.title.indexOf(" " , 20))}
    </h6>

    <h4  className='h6 main-color my-3'>price : {pro.price}<span>egp</span></h4>
        </div>
        <div className="right my-2">
            <button className='btn btn-outline-success' onClick={function(){updateCartProducts(pro.product.id , pro.count+1)}}>+</button>
           <input type='button'   className='inp' value={pro.count} id='dec' min={1}/> 
           {pro.count >=2      ?   <button className='btn btn-outline-success'  onClick={function(e){setUpdateCart(pro.product.id , pro.count-1 )}}   id='decBtn'>- </button> : 
            <button className='btn btn-outline-success' disabled  >- </button>
}

    </div>

        <div>
            <i className="fa-solid fa-trash-can bg text-danger"></i>
    <span className='cursor-pointer' onClick={function(){deleteItemFromCart(pro.product.id)}}>Remove</span>

     </div>
</div>


   </div>

)}
     <div style={{display:"none"}} className="updateMsg alert alert-success float-end">Item updated to cart</div>

<div  style={{display:"none"}} className='alert alert-success remove-msg position-fixed'>Item removed from your cart</div>

   

   </div> : <Loading/>}

    </>


}
