import faker from "faker";
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { cartReducer, productReducer } from "./Reducers"

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
   
  const [data,setData] =useState()

    let clientID = "VOFIXp9GmCTGNLWITv1lB-WVt4HH9dhsx3kWDM2R35o"
    let url = `https://api.unsplash.com/photos/?client_id=${clientID}`

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const value = await response?.json()
         
        setData(value)
        console.log(value);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(()=>{
      fetchData()
    },[])

    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: data?.map((d) => d.urls.regular),
        inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
    }))

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: [],
    })

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    })

    return (
      <>
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>
      </>
    )
};


export const CartState = () => {
    return useContext(Cart)
};

export default Context;


// <script>
//     let clientID = "VOFIXp9GmCTGNLWITv1lB-WVt4HH9dhsx3kWDM2R35o"
//     let endpoint = `https://api.unsplash.com/photos/?client_id=${clientID}`
// </script>
