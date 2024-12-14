import toast from "react-hot-toast";
import {purchasePaymentEndpoints} from "../api";
import { apiConnector } from "../apiConnector";

const { CAPTURE_PAYMENT, VERIFY_SIGNATURE } = purchasePaymentEndpoints;

const loadScript = async (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const buyProduct = async (
  token,
  products,
  userDetails,
  navigate,
  dispatch
) => {
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Failed To Load the Script");
    }
    const orderResponse = await apiConnector(
      "POST",
      CAPTURE_PAYMENT,
      { products },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse.data.success) {
      toast.error("Failed To Create Order");
    }
    console.log("orderResponse>>>>>>>>>>>>>>>>>>>>>>>>>>>", orderResponse);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      currency: orderResponse.data.paymentResponse.currency,
      amount: orderResponse.data.paymentResponse.amount,
      order_id: orderResponse.data.paymentResponse.id,
      name: "UrbanMart",
      description: "Thanks For Purchasing the Product",
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
      },
      handler: function (response) {
        console.log("RESPONSE",response)
        verifyPayment({ ...response, products }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed",function(response){
      toast.error("Error In Payment")
    })
  } catch (error) {
    toast.error("Error in Payment")
    console.log("Error In Payment",error.message)
  }
};

export const verifyPayment = async(bodyData,token,navigate,dispatch) => {
    try {
        const response = await apiConnector("POST",VERIFY_SIGNATURE,bodyData,{
            Authorization : `Bearer ${token}`
        });
        if(!response.data.success){
            toast.error(response.data.message)
        }
        toast.success("Payment Successfully done");
        navigate("/purchases")
    } catch (error) {
        console.log(error.message)
    }
};
