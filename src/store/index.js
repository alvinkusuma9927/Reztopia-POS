import { createSlice, configureStore } from '@reduxjs/toolkit';
const states = createSlice({
  name: 'states',
  initialState: {
    loginSession:{
      email:localStorage.email,
      password:localStorage.password
    },
    cart:[

    ]
  },
  reducers: {
    login:(state,action)=>{
      state.loginSession.email = action.payload.email
      state.loginSession.password = action.payload.password
      localStorage.email = state.email
      localStorage.password = state.password
    },
    insertCart: (state,action)=>{
      let indexCart = state.cart.findIndex((item)=> item.id === action.payload.id )
      if(indexCart === -1){
        state.cart.unshift(
          {
            id:action.payload.id,
            outletName:action.payload.outletName,
            name:action.payload.name,
            imgUrl:action.payload.imgUrl,
            normalPrice:action.payload.normalPrice,
            discountPrice:action.payload.discountPrice,
            type:action.payload.type,
            description:action.payload.description,
            count: 1,
            note:''
          }
        )
      }
      else{
        state.cart[indexCart].count += 1
      }
      
    },
    writeNote:(state,action)=>{
      let indexCart = state.cart.findIndex((item)=> item.id === action.payload.id )
      state.cart[indexCart].note = action.payload.note
    },
    editCount:(state,action)=>{
      let indexCart = state.cart.findIndex((item)=> item.id === action.payload.id )
      if(action.payload.count >= 0){
        state.cart[indexCart].count = action.payload.count
      }
    },
    removeCart:(state,action)=>{
      let indexCart = state.cart.findIndex((item)=> item.id === action.payload.id )
      state.cart.splice(indexCart,1)
    }
  }
})

export const actions = states.actions;
const store = configureStore({
  reducer : states.reducer
})

export default store;