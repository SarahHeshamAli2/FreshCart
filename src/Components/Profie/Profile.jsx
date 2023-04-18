import React from 'react'

export default function Profile({currentUser}) {

    return <>
    <h2 className='text-center my-5'>Hello {currentUser.name.slice(0,currentUser.name.indexOf(" ",5))}</h2>
    
    </>

}
