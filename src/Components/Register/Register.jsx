import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import axios from "axios"
import $ from "jquery"
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
const user = {
name:"",
email:"",
password:"",
rePassword:"",
phone:""


}



let validation = Yup.object({

name:Yup.string().required("name is requried").min(3,"minimum length is 3").max(15,"maximum length is 15"),
email:Yup.string().required("email is requried").email("email is invalid"),
password:Yup.string().required("password is requried").matches(/^[A-Z][a-z0-9]{5,10}$/,"password must starts with capital letter from 5 to 10 charch"),
rePassword:Yup.string().required("repassword is requried").oneOf([Yup.ref("password")],"repassword and password don't match"),
phone:Yup.string().required("phone is requried").matches(/^01[0125][0-9]{8}/,"you must enter valid egyptian number"),


})

    let formik=useFormik ({
  initialValues:user,
  onSubmit: function(values){
  

    registerNewUser(values)

  },
  validationSchema:validation
  
  
  
  })

  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  
  async function registerNewUser(obj) {

    try {
      setisLoading(true)
      let {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",obj)
      console.log(data);
      
      console.log(data);
      if(data.message=="success") {
        setisLoading(false)
        $(".fa-check").fadeIn(500)
        $(".successMsg").fadeIn(1000 ,function() {

          navigate("/login")

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

    
function showAndHideRePassword() {
  let rePassword = document.querySelector("#rePassword")


  if(rePassword.getAttribute("type") == "password" ) {

    rePassword.setAttribute("type","text")
    $(".closed-eye-re").fadeOut(100)
    $(".open-eye-re").fadeIn(100)
   
} else {

 rePassword.setAttribute("type","password")
 $(".closed-eye-re").fadeIn(100)
 $(".open-eye-re").fadeOut(100)
}

}



  return <>
  
    <div className="container my-3">
      <h2>Register Now</h2>

        
      <div style={{"textAlign":"center" , "display":"none"}} className='alert alert-danger errorMsg'>Email already in use</div>
      <div style={{"textAlign":"center" ,"display":"none" }} className='alert alert-success successMsg'>Register successfully</div>


      <form onSubmit={formik.handleSubmit } >
        <label className='my-2 ' htmlFor="name">name:</label>
        

          <div className='position-relative'>
            
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className="form-control position-relative " id='name'/>
          <i  style={{"display":"none"}} className="fa-solid fa-check position-absolute text-success"></i>
          </div>
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:null}
          
        <label className='my-2' htmlFor="email">email:</label>

          <div className='position-relative'>
            
       
        <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='form-control' id='email'/>
        <i  style={{"display":"none"}} className="fa-solid fa-check position-absolute text-success"></i>

          </div>

        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}

          <div className='position-relative'>
          <label className='my-2' htmlFor="password">password:</label>
        <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='form-control ' id='password'/>
        <svg  onClick={showAndHidePassword} className='fa-eye position-absolute closed-eye' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8s-3 6-9 6-9-6-9-6M4.416 11.377l-2.475 2.475M4.416 11.377l-2.475 2.475M19.88 11.377l2.475 2.475M9.031 14.317l-.906 3.381M14.971 14.317l.906 3.38" stroke="#8795A1" strokeWidth="1.5"strokeLinecap="round"></path></svg>

        <i style={{"display" : "none"}} onClick={showAndHidePassword} className="fa-solid fa-eye position-absolute  open-eye "></i>
          </div>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}

        <div className='position-relative'>
        <label className='my-2' htmlFor="rePassword">rePassword:</label>
        <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="Password" className='form-control' id='rePassword'/>
        <svg  onClick={showAndHideRePassword} className='fa-eye position-absolute closed-eye-re' width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8s-3 6-9 6-9-6-9-6M4.416 11.377l-2.475 2.475M4.416 11.377l-2.475 2.475M19.88 11.377l2.475 2.475M9.031 14.317l-.906 3.381M14.971 14.317l.906 3.38" stroke="#8795A1" strokeWidth="1.5" strokeLinecap="round"></path></svg>

<i style={{"display" : "none"}} onClick={showAndHideRePassword} className="fa-solid fa-eye position-absolute  open-eye-re "></i>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}

        <label className='my-2' htmlFor="phone">phone:</label>
        <div className='position-relative'> 
        <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className='form-control' id='phone'/>
        <i  style={{"display":"none"}} className="fa-solid fa-check position-absolute text-success"></i>

        </div>
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>:null}

        {isLoading? <button  className='btn btn-success ' type='button'><i className="fa-solid fa-spinner fa-spin  mt-3"></i></button>:<button type='submit' className='btn btn-success mt-3 load-bt'>Register</button>}
        <p className='my-3'>Already have an account ? <Link to="/login">Sign in</Link></p>

        

        
      </form>
    </div>
  
  
  </>



}
