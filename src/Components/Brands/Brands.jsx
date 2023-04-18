import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import {Link, useParams} from "react-router-dom"

export default function Brands() {
    

    const [allBrands, setallBrands] = useState(null)

    async function getAllBrands () {

     const {data} =   await axios.get("https://route-ecommerce.onrender.com/api/v1/brands")
        setallBrands(data.data)
    }


useEffect(function(){
getAllBrands()


},[])

  return <>
    {allBrands ?     <div className="container">
        <div className="row align-items-center">
            <div className="col-md-3">
                <h4 className='text-primary fw-bolder'>Our Brands</h4>
                <p>you can see our brands and each brand included in it</p>
            </div>
            {allBrands.map((brand,index)=>     < div className="col-md-3" key={index}>
             <Link to={`/brandDetails/${brand._id}`} className='text-decoration-none'>
             
             <div className="inner-col">
                    <img src={brand.image} alt="" className='w-100' />
                    <p className='text-center text-primary fw-bolder'>{brand.name}</p>
                
                </div>
             </Link>
            </div>)}
        
        </div>
    </div> : <Loading/>}
  </>
   
}
