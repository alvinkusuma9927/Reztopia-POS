import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useState } from 'react';
const states = createSlice({
  name: 'states',
  initialState: {
    loginSession:localStorage.loginSession,
    cart:[

    ]
  },
  reducers: {
    login:(state,action)=>{
      state.loginSession = JSON.stringify(action.payload.dataLogin)
      localStorage.loginSession = JSON.stringify(action.payload.dataLogin)
    },
    logout:(state)=>{
      state.loginSession = ""
      localStorage.loginSession = ""
    },
    insertCart: (state,action)=>{
      let indexCart = state.cart.findIndex((item)=> (item.id_product === action.payload.id_product && item.id_outlet === action.payload.id_outlet ) )
      console.log(action.payload)
      if(indexCart === -1){
        const cartInsertData = action.payload;
        cartInsertData.count = 1;
        cartInsertData.note = ''
        state.cart.unshift(
          cartInsertData
        )
      }
      else{
        state.cart[indexCart].count += 1
      }
      
    },
    setCartValue: (state,action)=>{
      state.cart = action.payload.newDataCart
    },
    writeNote:(state,action)=>{
      let indexCart = state.cart.findIndex((item)=> (item.id_product === action.payload.id_product && item.id_outlet === action.payload.id_outlet ) )
      state.cart[indexCart].note = action.payload.note
    },
    editCount:(state,action)=>{
      let indexCart = state.cart.findIndex((item)=> (item.id_product === action.payload.id_product && item.id_outlet === action.payload.id_outlet ) )
      if(action.payload.count >= 0){
        state.cart[indexCart].count = action.payload.count
      }
    },
    removeCart:(state,action)=>{
      let indexCart = state.cart.findIndex((item)=> (item.id_product === action.payload.id_product && item.id_outlet === action.payload.id_outlet ) )
      state.cart.splice(indexCart,1)
    }
  }
})

export const actions = states.actions;
const store = configureStore({
  reducer : states.reducer
})

export default store;