import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import $ from "jquery"
import {Link, useParams} from "react-router-dom"
import CategorySlider from '../CategorySlider/CategorySlider'
import HomeSlider from '../HomeSlider/HomeSlider'
import { cartStore } from '../../Context/CartStore'

export default function Home({currentUser, preventReload}) {
  const {addProductToCart,isLoad,addToWhishList,lo} =useContext(cartStore)

const [allProducts, setallProducts] = useState(null)
const [isLoading, setisLoading] = useState(false)
const [proDetail, setproDetail] = useState([])
const [allImages, setallImages] = useState([])
const [isDone , setIsDone] = useState (false)
  async function getAllProducts(value) {
    setisLoading(true)
   const {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/products",{
    params : {"sort" : value}
   })
    setallProducts(data.data)
    setisLoading(false)
  }  
  async function getProductDetails(id) {
    setIsDone(true)
    const {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
        setproDetail(data.data)
        setallImages(data.data.images)
        setIsDone(false)
    }
    
  useEffect (function(){
 
    
    getAllProducts()

    setisLoading(false)
   

  },[])

  function getSorting(e) {
  
   getAllProducts(e) 

    
  

  }

   function testing (id) {
    getProductDetails(id)

    proDetail ? $(".ngrb").fadeIn(500): console.log("err");

   }

async function getProd(id) {
  let response = await addProductToCart(id)


}

   function getImgSrc( e) {

    let imgSrc = e

    document.getElementById("myimage").setAttribute("src" , imgSrc)
}

function getUserName() {

  setTimeout(function() {
    $(".welcomeBack-name").fadeIn(2000,()=>{
      $(".welcomeBack-name").fadeOut(2000)
    })
    preventReload()
}, 2000);


}
return <>



  <HomeSlider/>

<CategorySlider/>



    {allProducts ?
    <div className="container">
      <h4 className='mt-5 mb-0 fw-bolder'> Featured products</h4>
        <div className="dropdown float-end mt-2">
  
        {isLoading?<Loading/> :<button className="btn btn-outline-success dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Sort By
   <ul className="dropdown-menu">
  <li  className='sorting' onClick={(e)=>{getSorting(e.target.innerText)}}  ><a className="dropdown-item" >title</a></li>
  <li  className='sorting' onClick={(e)=>{getSorting(e.target.innerText)}}  id='spc'><a className="dropdown-item" > price</a></li>
</ul>
  </button>  
  }
</div>

  <div className="container">

  <div className="row g-5   position-relative" >

 
            {allProducts.map((pro,index)=>  < div className="col-md-3 col-sm-6 position-relative hover-quick"  key={index}>
    
        <Link to={`/prodetails/${pro.id}`} className='text-decoration-none '>
        
        <div className="inner-col">
                    <img src={pro.imageCover} alt={pro.title} className='w-100 my-3 bg-secondary' />
                    <p className='ctg-name '>{pro.category?.name}</p>
                    <h6 className='fw-bolder'>{pro.title.slice(0,pro.title.indexOf(' ', 8)) } </h6>
                    <div className='mt-2'>{pro.priceAfterDiscount? <div><span className='text-decoration-line-through'>{pro.price}  </span> <span className='text-danger ms-2'>{ pro.priceAfterDiscount} EGP</span> </div>: <span>{pro.price} EGP</span> }</div>
                    <div className="rating d-flex justify-content-end align-items-center">
                    <i className="fa-solid fa-star"></i>
                        <p className='rate'>{pro.ratingsAverage}</p>
                       
                    </div>

                </div>
  
</Link>


  <button style={{display:"none"}}  type="button" className="btn quick-btn text-white position-absolute top-50 start-50 translate-middle w- " data-bs-toggle="modal" data-bs-target="#exampleModal"      onClick={function(){testing(pro.id)}}>
  Quick view
</button>
  




 <div className="modal fade modal-lg " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header border-0">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body position-relative">
    {isDone ? <div className='d-flex justify-content-center align-items-center'><i className="fa-solid fa-spinner fa-spin  fs-1 "></i></div>:   <div className="row align-items-center ">
        <div className="col-md-6">
                <div className="inner-col ">
                    
                    <img src={proDetail.imageCover} alt={proDetail.title} className='w-100 rounded-2' id='myimage'/>
                    
                   
                </div>
            </div>
  <div className="col-md-6 ngrb ">
                    <h2>{proDetail.title}</h2>
                    <p>{proDetail.description}</p>
                    <p>Price: <span className='text-primary fw-bolder'>{proDetail.price}</span> EGP</p>
                    <div className="img-box w-100 my-3">
                    {allImages.map((img,index)=>
                       <img src={img} alt=""  key={index} className='imgs-box rounded-2 w-25 cursor-pointer'  onClick={(e)=>{getImgSrc(e.target.getAttribute("src"))}}/>
                     )}
                    </div>

                    <div className="inn float-end">
                  
                    {isLoad? <button  className='btn btn-success loading-btn' type='button' ><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> :                      <button className='btn btn-success  add-btn' onClick={function(){getProd(proDetail._id)}}>Add to cart</button>
                    
} 

  <div>
    <div>
</div>
    <div>
  {lo? <i className="fa-solid fa-heart text-secondary mx-2 fa-spin"></i> :<button type='button' onClick={function(){addToWhishList(proDetail._id)}} className='btn border border-2 my-2 love-btn' >    <i className="fa-solid fa-heart text-secondary mx-2 "></i>Add to Loves</button>
}
  <div style={{display:"none"}} className='alert alert-success suc position-absolute top-50 end-0'>Item added successfully to wishList</div>

    </div>
  </div>

                  </div>
                 
                      
   
<div>

</div>

                </div>
             
        </div>}
        <div style={{display:"none"}}  className='alert alert-success suc-msgg position-absolute top-50 end-0'>Item added successfully to cart</div>
       

      </div>
  
    </div>

  </div>
  

</div>


                </div>
                
                
                )}

        </div>





      
  </div>
    </div> : <Loading/> }




</>



}
