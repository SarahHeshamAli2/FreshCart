import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import logo from "../../images/freshcart-logo.svg"
import { useContext } from 'react'
import $ from "jquery"
import CartStoreProvider, { cartStore } from '../../Context/CartStore'
 export default function Navbar({currentUser ,clearUserData}) {
  const{numberOfCartItems,getCartProducts,updateCartProducts,cartProducts,getWhishList}=useContext(cartStore)

 const navigate = useNavigate()
function navigateToHome() {
clearUserData()
navigate("/login")

}
let heightOfNav =$(".navbar").outerHeight(true)
useEffect(function(){
  
  updateCartProducts()

  
},[])
return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top " style={{marginBottom:heightOfNav}} > 
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
  <img src={logo} alt="fresh cart logo" className='w-100' />

    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        {currentUser !=null ?  <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li> : ""}

  
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {currentUser !=null ? <> 
          <li className="nav-item position-relative mx-3">
          <span className=" position-absolute top-0 start-100 translate-middle p-2 bg-danger text-white badge">{numberOfCartItems}</span>
        <Link onClick={getCartProducts} className="nav-link" to="/cart"><img src={require("../../images/shopping-cart.png")} width={30} alt="" /></Link>
        </li>
        <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Profile
  </button>
  <ul className="dropdown-menu">
  <li className="dropdown-item">
          <Link className="nav-link p-0" to="/allorders">All orders</Link>
        </li>
        <li className='dropdown-item'  >
        <Link className="nav-link p-0" to="/wishlist">Wishlist</Link>
        </li>
  </ul>
</div>
          
         
          <li className="nav-item" >
          <span onClick={navigateToHome}  className="nav-link logout" to="/">Log out</span>
        </li>
        
        </> : <>   <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
     
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        
        
        
        
         </>} 
      
     

  
      </ul>
    </div>
  </div>
</nav>
  


</>



}
