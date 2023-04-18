import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import axios from "axios"
import $ from "jquery"
import { Link, useNavigate } from 'react-router-dom'







export default function Login({getUserDataDecoded, currentUser}) {
const user = {

email:"",
password:"",



}



let validation = Yup.object({

email:Yup.string().required("email is requried").email("email is invalid"),
password:Yup.string().required("password is requried").matches(/^[A-Z][a-z0-9]{5,10}$/,"password must starts with capital letter from 5 to 10 charch"),


})

    let formik=useFormik ({
  initialValues:user,
  onSubmit: function(values){
  

    loginUser(values)

  },
  validationSchema:validation
  
  
  
  })

  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();

  function navigateHome() {
    navigate("/")
    
   
  }

  async function loginUser(obj) {
   
    try {
      setisLoading(true)
      let {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signin",obj)
      

      if(data.message=="success") {
   

        setisLoading(false)
        $(".fa-check").fadeIn(500)
        $(".successMsg").fadeIn(2000 ,function() {
          localStorage.setItem("userToken" , data.token)

          
          getUserDataDecoded()
        
      
        
          navigateHome()
          
        })

     
      }
       
    } catch (error) {

      setisLoading(false)
      $(".errorMsg").fadeIn( 500,()=>{
        
        setTimeout(() => {
          $(".errorMsg").fadeOut(2000)
        }, 1000);

      })      

      

   


    }


  }
 
  function showAndHidePassword() {
    let password = document.querySelector("#password")

   

      if(password.getAttribute("type") == "password" ) {

           password.setAttribute("type","text")
           $(".closed-eye").fadeOut(100)
           $(".open-eye").fadeIn(100)
      } else {

        password.setAttribute("type","password")
        $(".closed-eye").fadeIn(100)
        $(".open-eye").fadeOut(100)
      }

    

  }



  return <>

    <div className="container my-3">
      <h2>Login</h2>

        
      <div style={{"textAlign":"center" , "display":"none"}} className='alert alert-danger errorMsg'>Incorrect email or password</div>
      {<div style={{"textAlign":"center" ,"display":"none" }} className='alert alert-success successMsg'>Welcome back ! </div>
}


      <form onSubmit={formik.handleSubmit } >
       
          
        <label className='my-2' htmlFor="email">email:</label>

          <div className='position-relative'>
            
       
        <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='form-control' id='email'/>
        <i  style={{"display":"none"}} className="fa-solid fa-check position-absolute text-success"></i>

          </div>

        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

          <div className='position-relative'>
      <div className='d-flex justify-content-between align-items-center my-3'>
      <label className='' htmlFor="password">password:</label>
          <Link className='m-0' to="/forgotPass">          Forgot your password?
</Link>
      </div>
        <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='form-control ' id='password'/>
        <svg  onClick={showAndHidePassword} className='fa-eye position-absolute closed-eye' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8s-3 6-9 6-9-6-9-6M4.416 11.377l-2.475 2.475M4.416 11.377l-2.475 2.475M19.88 11.377l2.475 2.475M9.031 14.317l-.906 3.381M14.971 14.317l.906 3.38" stroke="#8795A1" strokeWidth="1.5" strokeLinecap="round"></path></svg>

<i style={{"display" : "none"}} onClick={showAndHidePassword} className="fa-solid fa-eye position-absolute  open-eye "></i>          </div>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}

      

      

        {isLoading? <button  className='btn btn-success load-bt' type='button'><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button>:<button type='submit' className='btn btn-success mt-3 log-bt'>Login</button>}
        <p className='my-3'>New to freshCart ? <Link to="/register">Sign Up</Link></p>

        

        
      </form>
    </div>
  
  
  </>



}
