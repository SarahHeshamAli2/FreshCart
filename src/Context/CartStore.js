import axios from 'axios'
import { data } from 'jquery';
import React, { createContext, useState } from 'react'
import $ from "jquery"
import { useEffect } from 'react';
import EmptyCart from '../Components/EmptyCart/EmptyCart';
import Loading from '../Components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

import { app } from '../firebas.config';

import { GoogleAuthProvider,getAuth,signInWithPopup,signOut} from "firebase/auth";

export const cartStore =createContext()

export default function CartStoreProvider({children}) {
const navigate =useNavigate()
const [cartData, setCartData] = useState([])

const [isLoad, setIsLoad] = useState(false)
const [numberOfCartItems, setNumberOfCartItems] = useState()
const [totalCartPrice, setTotalCartPrice] = useState(0)
const [cartProducts, setCartProducts] = useState(null)
const [cartId, setCartId] = useState(null)
const [createdAt, setCreatedAt] = useState(null)
const [lo,setIsLo] = useState(false)
const [wishList, setWishList] = useState(null)
const [proDetail, setproDetail] = useState([])
const [Lod, setLod] = useState(null)
const [filtred , setFiltred] = useState(null)
const [newAdress, setAdress] = useState([])


      
function setNewAdress() {
let shippingDetails =     [  {
        "details": document.querySelector("#address").value,
        "phone": document.querySelector("#phone").value,
        "city": document.querySelector("#city").value
        }]

   
setAdress (shippingDetails)
    
  

 
    localStorage.setItem("adress",JSON.stringify(newAdress))
    console.log(newAdress);

}
function deleteAdress(id) {
      newAdress.splice(id,1)
      console.log(newAdress);;
    }

    function filterArray() {

  
        setCartProducts( cartProducts?.filter((pro)=>pro.count > 0))
    }

async function deleteItemFromCart(id) {

        try {
                const {data}  = await  axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{
                        headers:{"token":localStorage.getItem("userToken")}
                     })
                     if(data.status == "success") {

                        $(".badge").text(data.numOfCartItems)
                        setNumberOfCartItems( data.numOfCartItems)
                        setTotalCartPrice(data.data.totalCartPrice)
                        setCartProducts( data.data.products)
                        $(".remove-msg").fadeIn(500).fadeOut(500)
                    
                     }
                
        } catch (error) {
                console.log("error:" , error);
                
        }

}
async function deleteFromWishList(id) {
        setIsLoad(true)
try {
        const {data}  = await  axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{
                headers:{"token":localStorage.getItem("userToken")}
             })
             console.log(data);
             setWishList(data.data)

             if(data.status == "success") {
                getWhishList()
                $(".rm-ms").fadeIn(500,function(){
                    setTimeout(() => {
                        $(".rm-ms").fadeOut(500)
                    }, 1000);
                })
             }
             
   setIsLoad(false)       
           
        } catch (error) {
        console.log("error:" , error);
        
}

}


async function getWhishList() {

        try {   
            setLod(true)
                const {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
                headers: {"token" : localStorage.getItem("userToken")}
        })
        
      
    setWishList(data.data)
    setproDetail(data.data)
    console.log(data);
setLod(false)
        } catch (error) {
                console.log("error",error);
        }
        }





        async function addProductToCart(proId) {

                try {   setIsLoad(true)
                         const {data} = await axios.post("https://route-ecommerce.onrender.com/api/v1/cart",{
                        "productId": proId
                    } , {headers:{"token":localStorage.getItem("userToken")}})
                
                    setCreatedAt(data.data.createdAt)
                setCartData(data.data)
                    if(data.status=="success") {
                        $(".badge").text(data.numOfCartItems)
                        setNumberOfCartItems(data.numOfCartItems)
                        setTotalCartPrice(data.data.totalCartPrice)
                        setCartProducts(data.data.products)
                        setIsLoad(false)
                        $(".succses-msg").fadeIn(1000,function(){
                                setTimeout(() => {
                                        $(".succses-msg").fadeOut(1000)   
                                }, 500);
                        })
                        $(".suc-msgg").fadeIn(500 , function() {
                                setTimeout(() => {
                                        $(".suc-msgg").fadeOut(500) 
                                }, 1000);
                        })
                      
                }
                 
                } catch (error) {
                        if(error.response.data.statusMsg=="fail"){
                                $(".notLogged").fadeIn(500,function(){
                                        setTimeout(() => {
                                                $(".modal-backdrop").removeClass("show").addClass("d-none")
                                                $(".notLogged").fadeOut(500)
                                               navigate("/login") 
                                               $("body").css("overflow","visible")

                                        }, 2000);
                                })
                        }
                        setIsLoad(false)
                     console.log("error:" ,error);   
                }

        }
  
      

        
        useEffect(function(){
               filterArray()
    

        },[])

        async function getCartProducts() {

                try {
                        
                        
                        const {data} =  await axios.get("https://route-ecommerce.onrender.com/api/v1/cart" , {

                        headers: {"token" : localStorage.getItem("userToken")}
        
                         })
                       
                         setNumberOfCartItems(data.numOfCartItems)
                         setTotalCartPrice(data.data.totalCartPrice)
                         setCartProducts(data.data.products)
                       

                        setIsLoad(false)
                       
                    
                       
                        setCartId(data.data._id)

                      
                         localStorage.setItem("cartId",data.data._id)
                        } 
                        
                     
                        catch (error) {
                        
                        if(error.response.data.statusMsg == "fail" ) {
                                setNumberOfCartItems(0)
                                navigate("/ecart")
                                
                        }
                }

        }


async function updateCartProducts(id,newCount) {
        setIsLoad(true)
        try {
                const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}` , {
        
                "count": newCount
           
},{headers:{"token":localStorage.getItem("userToken")}})

if(data.status == "success") {
        $(".updateMsg").fadeIn(500).fadeOut(500)
        $(".badge").text(data.numOfCartItems)
        setNumberOfCartItems( data.numOfCartItems)
        setTotalCartPrice(data.data.totalCartPrice)
        setCartProducts( data.data.products)
 
    
     }
     setIsLoad(false)


        } 
        
        
        
        catch (error) {
                if(error.response.data.statusMsg == "fail" ) {
                        console.log("error",error);
                }
           
        }


        
}

async function addToWhishList(proId) {
        setIsLo(true)
        try {
                
        const {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`, {
        
        "productId":proId
    
},{
headers: {"token":localStorage.getItem("userToken")}
})
setIsLo(false)
if(data.status=="success") {
        $(".suc").fadeIn(500,function(){
                setTimeout(() => {
                        $(".suc").fadeOut(500)    
                }, 1000);
        })
}        console.log(data);

        } 

        catch (error) {
                if(error.response.data.statusMsg=="fail"){
                        $(".notLogged").fadeIn(500,function(){
                                setTimeout(() => {
                                        $(".modal-backdrop").removeClass("show").addClass("d-none")
                                        $(".notLogged").fadeOut(500)
                                       navigate("/login") 
                                }, 2000);
                        })
                }
                setIsLoad(false)
                console.log("error:",error);
        }

}
        return <cartStore.Provider app={app} value={{addProductToCart,isLoad,cartData,numberOfCartItems,totalCartPrice,cartProducts,isLoad,deleteItemFromCart, updateCartProducts,getCartProducts,cartId,addToWhishList,lo,deleteFromWishList,getWhishList,wishList,newAdress,setNewAdress, deleteAdress, filterArray  }}>
     
        <p style={{zIndex:"58851471",display:"none"}} className='alert alert-danger position-fixed top-50 notLogged'>You are not logged in. Please login to get access</p>
                 
         {children}
       
        </cartStore.Provider>  
   
}
