import { Button } from "@/components/ui/button";
import { loginFunction } from "@/services/operations/user";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginFunction = async () => {
    try {
      setLoading(true);
      await dispatch(loginFunction(input, navigate));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back to UrbanMart
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg text-gray-700">
              Email
            </label>
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
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg text-gray-700">
              Password
            </label>
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

          {loading ? (
            <Button className="w-full p-3 mt-4 bg-yellow-900 text-gray-100 font-semibold rounded-md hover:bg-yellow-950 transition">
              <Loader className="animate-spin text-center" />
            </Button>
          ) : (
            <button onClick={handleLoginFunction} className="bg-blue-600 w-full rounded-md text-white p-2">
              Login
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
