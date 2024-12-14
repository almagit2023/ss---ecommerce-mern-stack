import { setAllProducts } from "@/redux/slice/product";
import { setIsAdmin } from "@/redux/slice/user";
import { allProductFunction } from "@/services/operations/product";
import { adminOrNot } from "@/services/operations/user";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRupeeSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const categories = [
    "Electronics and Gadgets",
    "Fashion and Apparel",
    "Health and Beauty",
    "Home and Living",
    "Grocery and Food",
    "Books and Stationery",
    "Sports and Outdoor",
    "Toys and Baby Products",
    "Automobiles and Accessories",
    "Pet Supplies",
    "Technology Services",
    "Specialty Categories",
    "Others",
  ];

  const dispatch = useDispatch();
  const [categoryState, setCategoryState] = useState("");

  const fetchAll = async () => {
    try {
      setLoading(true);
      const result = await allProductFunction();
      dispatch(setAllProducts(result));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const checkUserIsAdminOrNot = async () => {
    try {
      const res = await adminOrNot(token);
      console.log("ressssssssssssssssssssssssssss",res)
      dispatch(setIsAdmin(res.data.admin));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    checkUserIsAdminOrNot();
  }, []);

  // Filter logic
  const filterByPrice = (product) => {
    if (selectedPriceRange === "low") return product.price < 2000;
    if (selectedPriceRange === "medium")
      return product.price >= 2001 && product.price <= 20000;
    if (selectedPriceRange === "high") return product.price > 20000;
    return true;
  };

  const filterByCategory = (product) => {
    if (categoryState) return product.category === categoryState;
    return true;
  };

  // Filter products
  const filteredProducts = allProducts?.filter(
    (product) => filterByPrice(product) && filterByCategory(product)
  );

  // Show filtered products if available, else fall back to all products
  const currentItems = filteredProducts?.length > 0 ? filteredProducts : allProducts;

  // Paginate the current items
  const totalPages = Math.ceil(currentItems?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Paginated items to display
  const paginatedItems = currentItems?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-10 h-10 text-gray-600" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bg-gray-100 rounded-md border p-2 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 text-gray-400 cursor-pointer"
            >
              <option value="all">All Prices</option>
              <option value="low">Below Rs:2000</option>
              <option value="medium">Rs:2001 - Rs:20000</option>
              <option value="high">Above Rs:20000</option>
            </select>
            <div>
              <select
                value={categoryState}
                onChange={(e) => setCategoryState(e.target.value)}
                className="bg-gray-100 rounded-md cursor-pointer border p-2 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 text-gray-400"
              >
                <option>Select Category</option>
                {categories.map((category) => {
                  return <option key={category}>{category}</option>;
                })}
              </select>
            </div>
          </div>

          <div>
            {/* No Results Found message */}
            {paginatedItems?.length === 0 ? (
              <p className="text-center text-lg font-semibold text-gray-600">
                No results found
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedItems?.map((product) => (
                  <div
                    key={product?._id}
                    className="border p-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 bg-white relative"
                  >
                    <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-full object-fit transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="mt-4 mb-12">
                      <h2 className="text-xl font-bold text-gray-800 truncate">
                        {product?.title}
                      </h2>
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                        <FaRupeeSign /> <strong>{product?.price}</strong>
                      </p>
                      <p className="flex items-center gap-2 text-xs mt-1 text-gray-500 font-semibold">
                        Category : <span>{product.category}</span>
                      </p>
                    </div>
                    <Link
                      to={`/single/${product?._id}`}
                      className="absolute bottom-4 left-4 right-4 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-md transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {paginatedItems?.length > 0 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === i + 1
                        ? "bg-blue-800 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
