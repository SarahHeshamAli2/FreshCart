import React from 'react'
import "./Loading.css"
export default function Loading() {
 
  return <> 
  
  <div className='bg-white vh-100 position-fixed top-0 bottom-0 end-0 start-0' style={{zIndex:"9999999999"}}>
  <div className="cart-loader ">
              <div className="graph-loading">
                <span className="graph-loading__bar"></span>
                <span className="graph-loading__bar"></span>
                <span className="graph-loading__bar"></span>
                <span className="graph-loading__bar"></span>
                <span className="graph-loading__bar"></span>
              </div>
            </div>  
  </div>
          
  </>

}
