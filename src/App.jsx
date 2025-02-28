import React, { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Coin from './Pages/Coin/Coin'
import Footer from './Components/Footer/footer'
import Login from './Pages/Login/login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { ToastContainer, toast } from 'react-toastify';
// import Hello from './Pages/Hello'
const App = () => {

  const navigate = useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log('logged in')
        navigate('/')
      }else{
        console.log("logged out")
        navigate('/login')
      }
    })

  },[])
  return (
    <div className='app'>
      <ToastContainer theme='dark' />
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/coin/:coinId' element={<Coin/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
     <Footer/>
    </div>
  )
}
export default App