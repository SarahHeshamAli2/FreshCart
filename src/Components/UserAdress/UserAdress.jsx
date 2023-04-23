import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { cartStore } from '../../Context/CartStore'


export default function UserAdress({currentUser}) {

const {newAdress, deleteAdress}= useContext(cartStore)

useEffect(()=>{
},[])



return <> 

<div className="container my-5 py-5">
{       


    JSON.parse(    localStorage.getItem("adress")).map((adress,ind)=>
       
      
    <div className="row g-5 align-items-center border border-1 my-2 rounded-1" key={ind}>
    <div className="col-md-3">
        <div className="inner-col">
            <p>Name: <span className='mx-2 fw-bolder small'>{currentUser.name}</span></p>
            <p>Adress: <span className='mx-2  fw-bolder small'>{adress.details}</span> </p>
            <span>Phone: <span className='mx-2  fw-bolder'></span>{adress.phone}</span>
    
        </div>
    </div>
    
       <div className="col-md-6 col-6" >
        <div className="inner d-flex align-items-center justify-content-end">
            <div>

<button onClick={function(){deleteAdress(ind)}} className='btn btn-danger'>Delete Adress</button>
            </div>
         
        </div>
    </div>
    
    </div>
    
    
    )

}
 

</div> 


</>
}