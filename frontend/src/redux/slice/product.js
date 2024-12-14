import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts : [] ,
    product : null ,
    mensWear : [] ,
    womenSpecial : [] ,
    childrenSpecial : [] ,
    cartItems : [] ,
    purchases : [] ,
}

const userSlice = createSlice({
    name : "product",
    initialState ,
    reducers : {
        setAllProducts : (state,action)=>{
            state.allProducts = action.payload
        },
        setSingeProduct : (state,action)=>{
            state.product = action.payload
        } ,
        setMensSpecial : (state,action)=>{
            state.mensWear = action.payload
        },
        setWomenSpecial : (state,action)=>{
            state.womenSpecial = action.payload
        },
        setChildrenSpecial : (state,action)=>{
            state.childrenSpecial = action.payload
        } ,
        setCartItems : (state,action)=>{
            state.cartItems = action.payload
        } ,
        setAllPurchases : (state,action)=>{
            state.purchases = action.payload
        }
    }
})

export const {setAllProducts,setSingeProduct,setMensSpecial,setWomenSpecial,setChildrenSpecial,setCartItems,setAllPurchases} = userSlice.actions ;
export default userSlice.reducer ;