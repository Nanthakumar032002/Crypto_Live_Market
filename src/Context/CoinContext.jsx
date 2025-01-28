import {createContext, useEffect, useState } from "react";


export const CoinContext = createContext();

const CoinContextProvider = (props)=>{

    const[allCoin,setallCoin]=useState([]);
    const[Currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })
    const fetchAllcoin = async()=>{
        //coins list and market data
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-VqpxUCnNBCx7ARK3de6p8k71'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency.name}`, options)
            .then(res => res.json())
            .then(res => setallCoin(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchAllcoin();
    },[Currency])

    //whatever function or variable pass this object we can access that
    //any component using the useContext()
    
    const contextvalue = {
        allCoin,Currency,setCurrency
    }
    return(
        <CoinContext.Provider value={contextvalue}>
            {props.children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider;