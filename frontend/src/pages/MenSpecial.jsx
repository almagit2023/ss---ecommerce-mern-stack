import { setMensSpecial } from "@/redux/slice/product";
import { fetchMensProducts } from "@/services/operations/product";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const MenSpecial = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { mensWear, allProducts } = useSelector((state) => state.product);

  const fetchOnlyMens = async () => {
    try {
      setLoading(true);
      const result = await fetchMensProducts();
      dispatch(setMensSpecial(result));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnlyMens();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-10 h-10 text-gray-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mensWear?.map((product) => (
            <div
              key={product._id}
              className="border p-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 bg-white relative"
            >
              <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                <img
                  src={product?.image}
                  alt={product.title}
                  className="w-full h-full object-fit transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="mt-4 mb-12">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {product?.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  {product?.targetedAudience}
                </p>
              </div>
              <Link
                to={`/single/${product._id}`}
                className="absolute bottom-4 left-4 right-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenSpecial;
