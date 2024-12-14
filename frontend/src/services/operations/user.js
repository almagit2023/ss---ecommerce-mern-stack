import { apiConnector } from "../apiConnector";
import { user } from "../api.js";
import toast from "react-hot-toast";
import { setToken, setUser } from "@/redux/slice/user";
import { setCartItems } from "@/redux/slice/product";

const { REGISTER, LOGIN, ALL, ADMIN_NOT, GET_PROFILE, CHANGE_PROFILE_PICTURE , UPDATE_PROFILE } =
  user;

export const signupFunction = async (body, navigate) => {
  try {
    const result = await apiConnector("POST", REGISTER, body);
    console.log("RESULT", result);
    if (result && result.data.success) {
      console.log(result);
      toast.success(result.data.message);
      navigate("/login");
    }
  } catch (error) {
    const errorMsg =
      error?.response?.data?.errors?.[0]?.msg || "An error occurred";
    console.log(errorMsg);
    toast.error(errorMsg);
  }
};
export const loginFunction = (body, navigate) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN, body);
      if (response && response.data.success) {
        console.log("response..............................",response.data);
        navigate("/");
        toast.success(response.data.message);
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        dispatch(setCartItems(response.data.user.cartItem))
      }
    } catch (error) {
      console.log(error);
      const errorMsg = error?.response?.data?.errors?.[0]?.msg
        ? error?.response?.data?.errors?.[0]?.msg
        : error.response.data.message;
      toast.error(errorMsg);
    }
  };
};

export const getAllUsers = async () => {
  let result;
  try {
    const response = await apiConnector("GET", ALL);
    if (response && response.data.success) {
      result = response.data.users;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const adminOrNot = async (token) => {
  let result;
  try {
    const response = await apiConnector("GET", ADMIN_NOT, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("RES",response)
    if (response && response.data.success) {
      result = response;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const fetchProfile = async (token) => {
  let result;
  try {
    const response = await apiConnector("GET", GET_PROFILE, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("RESPONSE",response)
    if (response) {
      result = response.data.user;
    }
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

export const changePicture = async (body, token) => {
  let result;
  try {
    const response = await apiConnector("POST", CHANGE_PROFILE_PICTURE, body, {
      Authorization: `Bearer ${token}`,
    });
    if (response) {
      result = response.data.user;
    }
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const updateProfile = async(body, token) => {
  let result;
  try {
    console.log("BODY",body)
    const res = await apiConnector("PUT", UPDATE_PROFILE, body, {
      Authorization: `Bearer ${token}`,
    });
    console.log(res)
    if (res && res.data.success) {
      result = res.data.user;
    }
  } catch (error) {
    console.log(error)
    const errorMsg =
      error?.response?.data?.errors?.[0]?.msg || "An error occurred";
    toast.error(errorMsg);
  }
  return result;
};
