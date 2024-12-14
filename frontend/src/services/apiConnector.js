import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method,url,data,header,params) =>{
    return axiosInstance({
        method ,
        url ,
        data : data ? data : null ,
        headers : header ? header : null ,
        params : params ? params : null
    })
}