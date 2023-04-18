import React, { useEffect, useState } from 'react'

import error from "../../images/error.svg"


export default function Notfound() {


    useEffect(()=>{
    
       const im= document.querySelector("img")
       console.log(im);


    },[])
    return <>
    
    <div className="error d-flex justify-content-center align-items-center">
    <img src={error} alt="404" />

        
        </div>    

    
    </>


}
