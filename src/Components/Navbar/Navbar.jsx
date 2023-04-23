import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import logo from "../../images/freshcart-logo.svg"
import { useContext } from 'react'
import $ from "jquery"

import CartStoreProvider, { cartStore } from '../../Context/CartStore'
 export default function Navbar({currentUser ,clearUserData}) {
  const{numberOfCartItems,getCartProducts,updateCartProducts,cartProducts,getWhishList}=useContext(cartStore)
  function getCarting() {
    getCartProducts()
    hideNav()
  }

 const navigate = useNavigate()
function navigateToHome() {
  hideNav()
clearUserData()
navigate("/login")

}
function hideNav( ) {
$(".navbar-toggler").addClass("collapsed")
$(".navbar-collapse").removeClass("show")

$(".navbar-collapse").addClass("collapse")
$(".navbar-toggler").attr("aria-expanded","false")


}
let heightOfNav =$(".navbar").outerHeight(true)
useEffect(function(){

  updateCartProducts()

  
},[])
return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top " style={{marginBottom:heightOfNav}} > 
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" onClick={hideNav}>
  <img src={logo} alt="fresh cart logo" className='w-100' />

    </Link>
    <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" onClick={hideNav}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" onClick={hideNav} to="/brands">Brands</Link>
        </li>
        {currentUser !=null ?  <li className="nav-item">
          <Link className="nav-link" to="/cart" onClick={hideNav}>Cart</Link>
        </li> : ""}

  
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {currentUser !=null ? <> 
          <li className="nav-item position-relative mx-3">
          <span className=" position-absolute top-0 start-100 translate-middle p-2 bg-danger text-white badge">{numberOfCartItems}</span>
        <Link onClick={getCarting} className="nav-link" to="/cart"><img src={require("../../images/shopping-cart.png")} width={30} alt="" /></Link>
        </li>
        <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Profile
  </button>
  <ul className="dropdown-menu">
  <li className="dropdown-item">
          <Link className="nav-link p-0" to="/allorders" onClick={hideNav}>All orders</Link>
        </li>
        <li className='dropdown-item'  >
        <Link className="nav-link p-0" to="/wishlist" onClick={hideNav}>Wishlist</Link>
        </li>
      
  </ul>
</div>
          
         
          <li className="nav-item" >
          <span onClick={navigateToHome}  className="nav-link logout" to="/">Log out</span>
        </li>
        
        </> : <>   <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={hideNav}>Login</Link>
        </li>
     
        <li className="nav-item">
          <Link className="nav-link" onClick={hideNav} to="/register">Register</Link>
        </li>
        
        
        
        
         </>} 
      
     

  
      </ul>
    </div>
  </div>
</nav>
  


</>



}
