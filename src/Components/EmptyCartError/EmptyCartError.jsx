import React from 'react'

export default function EmptyCartError() {
    return <> 
    
    
    <div className=' d-flex justify-content-center'>
    <img src={require("../../images/istockphoto-861576608-612x612.jpg")} alt="empty cart" className='w-25' />

    </div>
    <p  className='text-center fs-4 my-2'>Looks Like you don't have previous orders ! go ahead and explore our site</p>
    
    </>
}
