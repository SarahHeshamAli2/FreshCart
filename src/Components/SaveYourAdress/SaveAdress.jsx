import React, { useContext } from 'react'
import { useState } from 'react'
import { json } from 'react-router-dom'
import { cartStore } from '../../Context/CartStore'

export default function SaveAdress() {
const {setNewAdress,newAdress}= useContext(cartStore)
   




  return <>
  
  <div className="container w-50 m-auto my-4 py-5">
    <form onSubmit={function(e){e.preventDefault()}}>
    <label className='my-2' htmlFor="address">Address details</label>
    <input id='address' type="text" className='form-control' placeholder='street name / building name' />
    <label className='my-2' htmlFor="phone">Phone Number</label>
    <input id='phone' type="text" className='form-control' placeholder='e.g. 1xxxxxxxxxx'/>
    <label className='my-2' htmlFor="city">City/Area</label>
    <input id='city' type="text" placeholder='e.g. Dokki / New cairo' className='form-control'/>
    <div style={{display:'none'}} className='fw-bolder my-3'>Please wait..</div> 

<button onClick={setNewAdress} className='btn btn-primary mt-3'>Confirm adress</button>

      <p style={{display:"none"}} className='alert alert-success saveAdress'>Adress Saved !</p>

    </form>
 </div>
  
  
  
  
  
  </>
}
