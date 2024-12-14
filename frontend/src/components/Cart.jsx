import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { IoCartOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { addOrRemoveToCart, fetchCart } from "@/services/operations/product";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "@/redux/slice/product";
import empty from "../assets/cart-empty.avif";
import { Loader } from "lucide-react";

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.user);

 
  const handleAddOrRemoveBookmark = async (id) => {
    try {
      const response = await addOrRemoveToCart(id, token);
      console.log("RES", response);
      dispatch(setCartItems(response));
    } catch (error) {
      console.log(error.message);
    }
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.product?.price * item.quantity,
    0
  );

  return (
    <div className="relative z-10">
      <Popover>
        <PopoverTrigger className="flex items-center space-x-2 relative">
          <span className="material-icons">
            <IoCartOutline size={24} />
          </span>
          {cartItems?.length > 0 && (
            <span className="bg-orange-500 text-white text-xs rounded-full px-2 absolute bottom-4 left-2">
              {cartItems.length}
            </span>
          )}
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-72 bg-gray-100 rounded-lg shadow-lg p-4"
        >
          <h2 className="font-bold text-lg mb-4">Cart</h2>
          {loading ? (
            <p className="text-center text-green-600 flex justify-center items-center">
              <Loader className="animate-spin" />
            </p>
          ) : cartItems?.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.product?._id} className="flex items-center mb-4">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-12 h-12 rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product?.name}</p>
                    <p className="text-sm text-gray-600">
                      Rs : {item.product?.price} x {item.quantity} = Rs:
                      {item.product?.price * item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddOrRemoveBookmark(item.product._id)}
                    className="text-red-500 text-sm"
                  >
                    <MdDeleteOutline size={16} />
                  </button>
                </div>
              ))}
              <div className="flex justify-between font-semibold mt-4">
                <span>Total:</span>
                <span>Rs:{totalPrice}</span>
              </div>
              <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg">
                Checkout
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={empty}
                alt="Empty Cart"
                className="w-20 h-20 mb-4 rounded-full"
              />
              <p className="text-gray-600">Your cart is empty.</p>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Cart;
