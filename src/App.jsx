import React, { useContext, useEffect, useState } from 'react'
import Home from './Components/Home/Home'


import{ Navigate, createBrowserRouter, createHashRouter} from "react-router-dom"
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import{ RouterProvider} from "react-router-dom"
import Notfound from './Components/Notfound/Notfound'
import Brands from './Components/Brands/Brands'
import ProDetails from './Components/ProDetails/ProDetails'
import BrandDetails from './Components/BrandDetails/BrandDetails'
import jwtDecode from 'jwt-decode'
import Profile from './Components/Profie/Profile'



import CartStoreProvider from './Context/CartStore'
import Cart from './Components/Cart/Cart'
import Payment from './Components/PaymentPage/Payment'
import EmptyCartError from './Components/EmptyCartError/EmptyCartError'
import AllOrders from './Components/AllOrders/AllOrders'
import EmptyCart from './Components/EmptyCart/EmptyCart'
import WishList from './Components/getWishList/WishList'
import ForgotPass from './Components/ForgotPass/ForgotPass'
import SaveAdress from './Components/SaveYourAdress/SaveAdress'
import UserAdress from './Components/UserAdress/UserAdress'



export default function App() {

    function ProtectedRoute({children}) {

        if(currentUser == null ) {
     
            return <>

  <Navigate to="/login" />
        
            </>
        } else  {

            return <>{children}</>
        }

    }


    useEffect(function(){


  
if(localStorage.getItem("userToken") !=null && currentUser == null) {

    getUserDataDecoded()
}

    },[])


    
    const [currentUser, setCurrentUser] = useState(null)


    function getUserDataDecoded() {
        let userToken = localStorage.getItem("userToken")
        let decodedToken = jwtDecode(userToken)
        setCurrentUser (decodedToken)
        localStorage.setItem("currentUserId",decodedToken.id)


    }



    function clearUserData () {
        localStorage.removeItem("userToken")
        localStorage.removeItem("decode")
        setCurrentUser(null)
    


    }
   
const router = createHashRouter([
    {path:"",element:<CartStoreProvider><Layout clearUserData={clearUserData}  currentUser={currentUser}/></CartStoreProvider>,children:[{index:true,element:<CartStoreProvider><Home  currentUser={currentUser} /></CartStoreProvider>},
    {path:"home" , element:<Home />},
    
    {path:"login",element:<Login     getUserDataDecoded={getUserDataDecoded} currentUser={currentUser}  />},
    {path:"prodetails/:id",element:<CartStoreProvider><ProDetails/></CartStoreProvider>},
    {path:"profile" , element:<ProtectedRoute><Profile currentUser={currentUser}/></ProtectedRoute>},
    {path:"brandDetails/:id",element:<CartStoreProvider><BrandDetails/></CartStoreProvider>},
    {path:"allorders",element:<CartStoreProvider><AllOrders currentUser={currentUser}/></CartStoreProvider>},
    {path:"cartStore",element:<CartStoreProvider/>},
    {path:"brands",element:<Brands/>},
    {path:"forgotPass",element:<ForgotPass/>},
    {path:"eCart",element:<EmptyCart/>},
    {path:"payment",element:<ProtectedRoute><CartStoreProvider><Payment/></CartStoreProvider></ProtectedRoute>},
    {path:"wishlist",element:<ProtectedRoute><CartStoreProvider><WishList/></CartStoreProvider></ProtectedRoute>},
    {path:"saveAdress",element:<ProtectedRoute><CartStoreProvider><SaveAdress /></CartStoreProvider></ProtectedRoute>},
    {path:"userAdress",element:<ProtectedRoute><CartStoreProvider><UserAdress currentUser={currentUser}/></CartStoreProvider></ProtectedRoute>},
    {path:"cart",element:<CartStoreProvider><Cart currentUser={currentUser}/></CartStoreProvider>},
    {path:"emptyCart",element:<CartStoreProvider><EmptyCartError/></CartStoreProvider>},
    {path:"register",element:<Register/>},{path:"*",element:<Notfound/>}]}






])


return <>

<RouterProvider router={router}/>


</>

}



