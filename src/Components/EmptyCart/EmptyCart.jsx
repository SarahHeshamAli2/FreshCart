import React from 'react'




export default function EmptyCart() {
 return<>
 
 
    <div className=' d-flex justify-content-center'>
    <img src={require("../../images/preview.png")} alt="empty cart" className='w-50' />

    </div>
    <p className='text-center fs-4'>Looks Like your cart is empty! go ahead and explore top categories</p>
 </>
}
