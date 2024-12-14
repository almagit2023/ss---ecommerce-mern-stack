import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : null ,
    user : null ,
    allUsers : [] ,
    isAdmin : null ,
    userProfile : null
}

const userSlice = createSlice({
    name : "user",
    initialState ,
    reducers : {
        setToken : (state,action)=>{
            state.token = action.payload
        },
        setUser : (state,action)=>{
            state.user = action.payload
        } ,
        setAllUsers : (state,action)=>{
            state.allUsers = action.payload
        } ,
        setIsAdmin : (state,action)=>{
            state.isAdmin = action.payload
        } ,
        setUserProfile : (state,action)=>{
            state.userProfile = action.payload
        }
    }
})

export const {setToken,setUser,setAllUsers,setIsAdmin,setUserProfile} = userSlice.actions ;
export default userSlice.reducer ;