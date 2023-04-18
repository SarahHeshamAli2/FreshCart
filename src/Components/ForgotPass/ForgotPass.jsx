import axios from 'axios'
import React, { useState } from 'react'
import $ from "jquery"
import { useNavigate } from 'react-router-dom'
export default function ForgotPass() {
    const navigate =useNavigate()
    const [loading, setloading] = useState(false)
    async function forgotPassword() {
        setloading(true)
        try {
            const {data}= await axios.post(" https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords", {
          
            "email": document.getElementById("email").value
        
        })
        if(data.statusMsg=="success") {
            $(".enterEmail").fadeOut(500)
            $(".reset-msg").fadeIn(500,function(){
                setTimeout(() => {
                    $(".reset-msg").fadeOut(1000)
                    $(".resetCode").fadeIn(2000)
                  
                }, 1500);
            })
        }

        } catch (error) {
            console.log("error",error);
        }
        setloading(false)

      }

      async function verifyCode() {
        try {
            setloading(true)

            const {data} =await axios.post ("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode", {
                "resetCode": document.getElementById("resetCode").value
    
            })
            if(data.status=="Success") {
                $(".resetCode").fadeOut(1000)
                $(".changePassword").fadeIn(1000)
                $(".rstCodeError").fadeOut(500)

            }
            console.log(data)
            setloading(false)
        } catch (error) {
            if(error.response.data.statusMsg=="fail") {
                $(".rstCodeError").fadeIn(500)
            }
            setloading(false)
            console.log("error",error);
        }

      }


      async function changePassword() {

        try {setloading(true)
            const {data} = await axios.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword",{
    "email":document.getElementById("changeEmail").value,
    "newPassword": document.getElementById("changePassword").value
})
 setloading(false)
 navigate("/login")
console.log(data);
        } catch (error) {
            if(error.response.data.statusMsg=="fail") {
                $(".err").fadeIn(500)
            }
            console.log("error",error);
            setloading(false)
        }

      }
    return <>
    
    <div className="container my-5 py-5">
      <div className='enterEmail'>
      <h3>Enter Your Email:</h3>
        <input type="email" name="" id="email" placeholder='Email' className='form-control'/>
        {loading?        <button type='button'  className='btn btn-primary my-3'><i className="fa-solid fa-spinner fa-spin   "></i></button>
:         <button type='button' onClick={forgotPassword} className='btn btn-primary my-3'>Confirm</button>

}
      </div>

<p style={{display:"none"}} className='alert alert-success w-25 reset-msg'>Reset code sent to your email</p>
    <div className='resetCode' style={{display:"none"}}>
    <h4>Enter reset code:</h4>
     <input className='form-control w-25' type="text" id='resetCode' placeholder='Enter reset code'/>   
     {loading?        <button type='button'  className='btn btn-primary my-3'><i className="fa-solid fa-spinner fa-spin   "></i></button>
:         <button type='button' onClick={verifyCode} className='btn btn-primary my-3'>Confirm</button>

}
    </div>

    <div className='changePassword' style={{display:"none"}}>
        <h6>Email</h6>
        <input type="email" className='form-control mb-4' placeholder='enter email' id='changeEmail'/>
        <h6>new password</h6>
        <input type="password" className='form-control' placeholder='enter your new password' id='changePassword'/>
        {loading?        <button type='button'  className='btn btn-primary my-3'><i className="fa-solid fa-spinner fa-spin   "></i></button>
:         <button type='button' onClick={changePassword} className='btn btn-primary my-3'>Confirm</button>

}    </div>
<p style={{display:"none"}} className='alert alert-success w-25 chngd'>Password changed successfully</p>
<p style={{display:"none"}} className='alert alert-danger w-25 err '>reset code not verified</p>
<p style={{display:"none"}}  className='alert alert-danger w-25 rstCodeError'>Reset code is invalid or has expired</p>

    </div>
    
    </>
}
