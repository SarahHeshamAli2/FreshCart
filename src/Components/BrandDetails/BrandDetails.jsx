import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import NoItems from '../NoItems/NoItems';
import $ from "jquery"
import CartStoreProvider, { cartStore } from '../../Context/CartStore';



export default function BrandDetails() {

  function getImgSrc( e) {

    let imgSrc = e

    document.getElementById("myimage").setAttribute("src" , imgSrc)
}

  const [proDetail, setproDetail] = useState([])
  const [allImages, setallImages] = useState([])
  const [isDone , setIsDone] = useState (false)
  const {addProductToCart,isLoad} =useContext(cartStore)

async function getBrandDetails () {
  try {
    
    const {data} =  await axios.get(`https://route-ecommerce.onrender.com/api/v1/products` , {
        params: {"brand" : id} 
        
        
    } )

setBrandDetails (data.data)
  } catch (error) {
    console.log("Error:" ,error);
    
  }

}
async function getProductDetails(id) {
  setIsDone(true)
  const {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
      setproDetail(data.data)
      setallImages(data.data.images)
      setIsDone(false)
  }
  
  function testing (id) {
    getProductDetails(id)

    proDetail ? $(".ngrb").fadeIn(500): console.log("err");

   }
 let {id } =useParams()
useEffect(function() {
    getBrandDetails()



} , [])

const [brandDetails, setBrandDetails] = useState(null)

  return <>
    {brandDetails ? <div className="container my-5 py-5">
   
        <div className="row g-5">
            {brandDetails.length == 0 ? <NoItems/> : brandDetails.map((pro,indx)=>     < div className="col-md-4 hover-quick position-relative" key={indx}>
            <Link to={`/prodetails/${pro.id}`} className='text-decoration-none '>
        
        <div className="inner-col ">
                    <img src={pro.imageCover} alt={pro.title} className='w-100 my-3 bg-secondary ' />
                    <p className='ctg-name '>{pro.category?.name}</p>
                    <h6 className='fw-bolder'>{pro.title?.slice(0,pro.title.indexOf(' ', 8)) } </h6>
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
      <div className="modal-body">
    {isDone ? <div className='d-flex justify-content-center align-items-center'><i className="fa-solid fa-spinner fa-spin  fs-1 "></i></div>:   <div className="row align-items-center ">
        <div className="col-md-6">
                <div className="inner-col ">
                    
                    <img src={proDetail.imageCover} alt={proDetail.title} className='w-100 rounded-2' id='myimage'/>
                    
                   
                </div>
            </div>
  <div className="col-md-6 ngrb ">
   
                    <h2>{proDetail.title}</h2>
                    <p>{proDetail.description?.slice(0,proDetail.description.indexOf(" " , 200))}</p>
                    <p>Price: <span className='text-primary fw-bolder'>{proDetail.price}</span> EGP</p>
                    <div className="img-box w-100 my-3">
                    {allImages.map((img,index)=>
                       <img src={img} alt=""  key={index} className='imgs-box rounded-2 w-25 cursor-pointer'  onClick={(e)=>{getImgSrc(e.target.getAttribute("src"))}}/>
                     )}
                    </div>

                    <div className="inn float-end">
                  
                    {isLoad? <button  className='btn btn-success loading-btn' type='button' ><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button> :                      <button className='btn btn-success  add-btn' onClick={function(){addProductToCart(proDetail._id)}}>Add to cart</button>
                    
} 
    <div>

<button className='btn border border-2 my-2 love-btn'>    <i className="fa-regular fa-heart"></i>Add to Loves</button>
    </div>
                  </div>
                 
                      
   
<div>

</div>

                </div>
             
        </div>}
        <div style={{display:"none"}}  className='alert alert-success suc-msgg '>Item added successfully to cart</div>

      </div>
  
    </div>

  </div>
  

</div>

            </div>)}
           
        
        </div>
    </div> : <Loading/>}
  
  </>
}
