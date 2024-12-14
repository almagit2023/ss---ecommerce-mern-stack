import React from "react";
import { useSelector } from "react-redux";

const Purchase = () => {
  const { user } = useSelector((state) => state.user);

  if (!user || !user.purchases || user.purchases.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No purchases to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white p-6 mb-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">User Details</h2>
        <div className="flex items-center space-x-4">
          <img
            src={user.image}
            alt={user.firstName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p>
              <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Purchased Products */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Purchased Products</h2>
        <ul className="divide-y divide-gray-200">
          {user.purchases.map((product) => (
            <li key={product._id} className="py-4 flex">
              <img
                src={product.image}
                alt={product.title}
                className="h-24 w-24 rounded-md object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 text-gray-900 font-semibold">₹{product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
                <p className="text-sm text-gray-500">Warranty: {product.warranty}</p>
                <p className="text-sm text-gray-500">Return Policy: {product.returnPolicy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Purchase;
