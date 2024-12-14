import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import { deleteProductFunction } from "@/services/operations/product";
import { setAllProducts } from "@/redux/slice/product";

const Products = () => {
  const [productName, setProductName] = useState("");
  const [filteredProducts,setFilteredProducts] = useState([]);

  const { allProducts } = useSelector((state) => state.product);
  const {token} = useSelector((state)=>state.user)
  const dispatch = useDispatch();

  const handleDeleteProduct = async(id) => {
    const body = {
      productId : id
    }
    try {
      const response = await deleteProductFunction(body,token);
      if(response){
        dispatch(setAllProducts(response))
      }
    } catch (error) {
      console.log(error)
    }
  };

  const searchFunc = () => {
    if (productName) {
      const response = allProducts.filter((product) =>
        product.title.toLowerCase().startsWith(productName.toLowerCase())
      );
      setFilteredProducts(response);
    } else {
      setFilteredProducts(allProducts);
    }
  };

  useEffect(()=>{
   searchFunc();
  },[allProducts,productName])



  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md space-y-6 w-full pb-12">
      <h2 className="text-2xl font-bold text-gray-700">Manage Products</h2>
      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <AddProduct/>
      </div>

      <div>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No products available. Start adding products!
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredProducts?.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between border border-gray-200 p-4 rounded-lg bg-white shadow-sm hover:shadow-md"
              >
                <span className="text-gray-700 font-medium">
                  {product?.title}
                </span>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
