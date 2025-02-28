import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login,signUp } from '../../../firebase'
// import {login,signup} from '../../firebase.js'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {
    
  const[signState,setSignState]=useState("Sign In")
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[loading,setLoading]=useState(false)  
  
  //create a function for userAuthentication 
   const user_auth = async(e)=>{
    e.preventDefault()
    setLoading(true)
    if(signState==="Sign In"){
      await login(email,password)
    }else{
      await signUp (name,email,password)
    }
    setLoading(false)
   } 
  const showbox =()=>{
    let a = document.getElementById("psw");
    if(a.type==='password'){
      a.type="text"
    }else{
      a.type="password"
    }
  }
  return ( 
    loading?<div className="login_spinner">
      <img src={netflix_spinner} alt="" />
    </div>: 
    <div className='login'>
        <img src={logo} className='login-logo' alt="" />
        <div className='login-form'>
          <h1>{signState}</h1>
          <form>
          {signState==="Sign Up"?
            <input value={name}  type="text" placeholder='Your name' 
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            :<></>}
            <input value={email} type="email" placeholder='Email'
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
            />
            <input value={password} id='psw' type="password" placeholder='Password'
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
            <input type="checkbox" id='checkbox' onClick={showbox} />Show password
            <button onClick={user_auth} type='submit'>  {/* very important line */}
            {signState}
            </button>
            <div className="form-help">
            <div className='remember'>
            <input type="checkbox" />
            <label htmlFor="">Remember Me</label>
            </div> 
            <p>Need Help?</p>
            </div>
          </form>
          <div className="form-switch">
           {signState==="Sign In"
            ?<p>New to Crypto? <span onClick={(()=>{
              setSignState("Sign Up")
            })} >Sign up Now</span></p> 
            :<p>Already have account? <span  onClick={(()=>{
              setSignState("Sign In")
            })} >Sign In Now</span></p>
            }
          </div>
        </div>
    </div>
  )
}

export default Login