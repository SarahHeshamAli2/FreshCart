import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import {Outlet} from "react-router-dom"

export default function Layout({currentUser ,clearUserData,handleLogOut}) {

return <>

<Navbar currentUser={currentUser} clearUserData={clearUserData} handleLogOut={handleLogOut}/>
<Outlet/>
<Footer/>

</>
}
