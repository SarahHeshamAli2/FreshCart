import React from 'react'




export default function EmptyCart() {
 return<>
 
 
   <div className='mt-5 py-5'>
   <div className=' d-flex justify-content-center lolo '>
    <img src={require("../../images/preview.png")} alt="empty cart" className='w-50  '  />

    </div>
   </div>
    <p className='text-center fs-4 fw-bolder'>Looks Like your cart is empty! go ahead and explore top categories</p>
 </>
}
