import { setCartItems, setSingeProduct } from "@/redux/slice/product";
import { buyProduct } from "@/services/operations/payment";
import { addOrRemoveToCart, fetchSingleProductFunction } from "@/services/operations/product";
import { CarTaxiFront, Edit, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product , cartItems } = useSelector((state) => state.product);
  const [quantity,setQuantity] = useState(1)
  const {token,user,isAdmin} = useSelector((state)=>state.user);

  const handleBuyProduct = async()=>{
    try {
      if(token){
        await buyProduct(token,[id],user,navigate,dispatch)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleAddOrRemoveBookmark = async() =>{
    try {
      const response = await addOrRemoveToCart(id,token , quantity);
      dispatch(setCartItems(response))
    } catch (error) {
      console.log(error.message)
    }
  }
 
  const productAlreadyInCart = () => {
    if (!product) return false;
    return cartItems?.some((item) => item.product?._id === product?._id);
  };
  
  

  const fetchSingle = async () => {
    try {
      setLoading(true);
      const result = await fetchSingleProductFunction(id);
      console.log(result);
      dispatch(setSingeProduct(result));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingle();
  },[]);

  const handleIncreaseQuantity = () => {
    console.log(quantity)
    setQuantity((prev)=>prev+1)
  };
  const handleDecreaseQuantity =()=>{
    if(quantity <= 1) return ;
    setQuantity((prev)=>prev-1)
  }

  return (
    <div className="max-w-7xl mx-auto p-8 mt-6">
      {loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <Loader className="animate-spin" size={32}/>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-auto rounded-lg shadow"
            />
            <div className="flex gap-4 mt-4">
              {[
                product?.image,
                product?.imageTwo,
                product?.imageThree,
                product?.imageFour,
              ]?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border hover:shadow cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div className="ml-12">
            <h4 className="uppercase text-sm text-orange-600 font-bold">
              {product?.supplier}
            </h4>
            <h1 className="text-4xl font-bold mt-2">{product?.title}</h1>
            <p className="text-gray-600 mt-4">{product?.description}</p>

            <div className="flex items-center gap-4 mt-6">
              <span className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FaRupeeSign/> {product?.price}
              </span>
              <span className="text-sm bg-orange-100 text-orange-600 font-bold py-1 px-2 rounded">
                50% OFF
              </span>
              <span className="text-gray-400 line-through text-sm">
                ₹{product?.price * 2}
              </span>
            </div>
            <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-50">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                <span>Warranty:</span>
                <span className="text-blue-600">{product?.warranty}</span>
              </div>
              <div className="mt-2 text-sm text-green-700 font-medium">
                {product?.returnPolicy} days return policy
              </div>
            </div>

            {
              isAdmin === false ? (<div className="mt-6 flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="px-4 py-2 text-lg font-bold"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="px-4 py-2 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <button onClick={handleAddOrRemoveBookmark} className={`flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-lg ${productAlreadyInCart() ? "" : "hover:bg-orange-700"}`} disabled={productAlreadyInCart()}>
                  <span className="material-icons">
                    <IoCartOutline size={24} />
                  </span>
                  Add to cart
                </button>
                <button onClick={handleBuyProduct} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Buy Now</button>
              </div>) : (
                <Link to={"/admin-dashboard"} className="w-fit p-2 px-6 py-4 flex items-center rounded-md mt-6 bg-blue-500 hover:bg-blue-700 transition-all duration-300 text-white justify-center">
                  <Edit/> Edit
                </Link>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
