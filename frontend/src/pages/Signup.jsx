import React, { useState } from "react";
import { Separator } from "@/components/ui/separator"; // Assuming you have this Separator component
import cart from "../../src/assets/cart.jpg";
import { signupFunction } from "@/services/operations/user";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    state: "",
    city: "",
    fullAddress: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      setLoading(true);
      await signupFunction(input, navigate);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center gap-12">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome to UrbanMart
        </h1>

        <div className="space-y-4">
          <div className="flex flex-row gap-6">
            <input
              id="firstName"
              type="text"
              value={input.firstName}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, firstName: e.target.value }))
              }
              placeholder="Enter First Name"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              id="lastName"
              type="text"
              value={input.lastName}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, lastName: e.target.value }))
              }
              placeholder="Enter Last Name"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-row gap-6">
            <input
              id="email"
              type="email"
              value={input.email}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Enter Email"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              id="password"
              type="password"
              value={input.password}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Enter Password"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex flex-row gap-6">
            <input
              id="state"
              type="text"
              value={input.state}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, state: e.target.value }))
              }
              placeholder="Enter State"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              id="city"
              type="text"
              value={input.city}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, city: e.target.value }))
              }
              placeholder="Enter City"
              className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <textarea
            id="fullAddress"
            value={input.fullAddress}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, fullAddress: e.target.value }))
            }
            placeholder="Enter Full Address"
            className="p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {loading ? (
            <Button className="w-full p-3 mt-4 bg-yellow-900 text-gray-100 font-semibold rounded-md hover:bg-yellow-950 transition">
              <Loader className="animate-spin text-center text-white" />
            </Button>
          ) : (
            <button
              type="submit"
              onClick={handleCreateUser}
              className="w-full p-3 mt-4 bg-yellow-900 text-gray-100 font-semibold rounded-md hover:bg-yellow-950 transition"
            >
              Sign Up
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      <Separator
        orientation="vertical"
        className="h-full border-gray-300 mx-4"
      />

      <div className="flex justify-center items-center max-w-lg w-full">
        <img
          src={cart}
          alt="Shopping Cart"
          className="w-full h-full rounded-lg shadow-xl shadow-black"
        />
      </div>
    </div>
  );
};

export default Signup;
