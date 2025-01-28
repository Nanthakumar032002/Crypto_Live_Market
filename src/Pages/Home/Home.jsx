import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Context/CoinContext'
import {Link} from 'react-router-dom';

const Home = () => {

  const{allCoin,Currency}=useContext(CoinContext)
  
  const[displayCoin,setdisplayCoin]=useState([]);
  const [input,setInput]=useState("");
  
  const Inputhandler=(e)=>{
      setInput(e.target.value)
      if(e.target.value===""){
        setdisplayCoin(allCoin)
      }
  }
  const searchHandler= async(event)=>{
    event.preventDefault();
    const coins= await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setdisplayCoin(coins)
  }
  useEffect(()=>{
    setdisplayCoin(allCoin)
  },[allCoin])
  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency 
        marketplace. Sign up to explore more about cyptos.</p>
        <form onSubmit={searchHandler}>

          <input type="text" 
            placeholder='Search crypto...' 
            value={input} 
            onChange={Inputhandler}
            list='coinlist'
            required/>
          
          <datalist id='coinlist'>
            {allCoin.map((item, index)=>(
              <option value={item.name} key={index}/>
            ))}
          </datalist>
          
          <button type='submit' >Search</button>
        </form>
      </div>
      <div className="crypto-taple">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24Hr Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>{
            return <Link to={`/coin/${item.id}`} className="table-layout"  key={index}>
              <p>{item.market_cap_rank}</p> 
              <div className='coins-items'>
                <img src={item.image} alt="" className='img' />
                <p>{item.name +" - "+ item.symbol}</p>
              </div>
              <p>{Currency.symbol}{item.current_price.toLocaleString()}</p>
              <p style={{textAlign:"center"}} 
              className={item.price_change_percentage_24h>0?"green":"red"}>
              {Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{Currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          })
        }
      </div>
    </div>
  )
}
export default Home