import React from 'react'

export default function NoItems() {
  return <>
  
  <div className="container my-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="inner-col">
            <img src={require("../../images/noav.jpg")} alt="no-items available" className='w-100 ' />
    <h4>No available items right now please come back soon</h4>
            </div>
        </div>
    </div>
  </div>
  
  </>

}
