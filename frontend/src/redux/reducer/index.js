import { combineReducers } from "@reduxjs/toolkit"
import userSlice from "../slice/user"
import productSlice from "../slice/product"

const rootReducer = combineReducers({
    user : userSlice ,
    product : productSlice
})

export default rootReducer ;