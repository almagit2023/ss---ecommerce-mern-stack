import { apiConnector } from "../apiConnector";
import { product } from "../api.js";
import toast from "react-hot-toast";

const {
  ALL,
  GET_SINGLE,
  MENS_PRODUCT,
  WOMENS_PRODUCT,
  CHILDRENS_PRODUCT,
  FETCH_CART_ITEMS,
  ADD_REMOVE_TO_CART,
  CREATE_PRODUCT,
  DELETE_PRODUCT ,
  PURCHASES
} = product;
console.log(ALL);

export const allProductFunction = async () => {
  let result;
  try {
    const response = await apiConnector("GET", ALL);
    if (response && response.data.success) {
      console.log(response);
      result = response.data.products;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const fetchSingleProductFunction = async (id) => {
  let result;
  try {
    const response = await apiConnector("POST", GET_SINGLE, { productId: id });
    if (response && response.data.success) {
      console.log(response);
      result = response.data.product;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const fetchMensProducts = async () => {
  let result;
  try {
    const response = await apiConnector("GET", MENS_PRODUCT);
    if (response && response.data.success) {
      result = response.data.products;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const fetchWomensProducts = async () => {
  let result;
  try {
    const response = await apiConnector("GET", WOMENS_PRODUCT);
    if (response && response.data.success) {
      result = response.data.products;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const fetchChildrensProducts = async () => {
  let result;
  try {
    const response = await apiConnector("GET", CHILDRENS_PRODUCT);
    console.log(response);
    if (response && response.data.success) {
      result = response.data.products;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const fetchCart = async () => {
  let result;
  try {
    const response = await apiConnector("GET", FETCH_CART_ITEMS);
    if (response && response.data.success) {
      result = response.data.carts;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const addOrRemoveToCart = async (id, token, quantity) => {
  let result;
  try {
    const response = await apiConnector(
      "POST",
      ADD_REMOVE_TO_CART,
      { productId: id, quantity: quantity },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response && response.data.success) {
      result = response.data.cartItems;
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const addProductFunction = async (body, token) => {
  let result;
  try {
    console.log(body,token)
    const response = await apiConnector("POST", CREATE_PRODUCT, body, {
      Authorization: `Bearer ${token}`,
    });
    console.log("RESPONSE",response)
    if (response && response.data.success) {
      result = response.data.createdProduct;
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error.response.data.errors[0].msg)
    toast.error(error.response.data.errors[0].msg);
  }
  return result;
};


export const deleteProductFunction = async (body,token) => {
  let result;
  try {
    console.log(body,token)
    const response = await apiConnector("DELETE", DELETE_PRODUCT, body, {
      Authorization: `Bearer ${token}`,
    });
    console.log("RESPONSE",response)
    if (response && response.data.success) {
      result = response.data.updatedProducts;
      toast.success(response.data.message);
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
  }
  return result;
};


export const getAllPurchases = async(token) =>{
  let result ;
  try {
    const response = await apiConnector("GET",PURCHASES,null,{
      Authorization : `Bearer ${token}`
    });
    console.log(response)
    if(response && response.data.success){
      result =  response.data.purchases
      console.log("RESULT",result)
    }
  } catch (error) {
    console.log(error)
  }
  return result
}


