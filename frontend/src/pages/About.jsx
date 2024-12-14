import React from 'react';
import { FaShippingFast, FaHeadset, FaHandsHelping, FaRegCreditCard } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Welcome to UrbanMart
      </h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        Your one-stop shop for high-quality products and exceptional service.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <FaShippingFast className="text-4xl text-blue-500 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Fast Shipping</h3>
          <p className="text-lg text-gray-600">
            Enjoy quick and reliable shipping on all your orders.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <FaRegCreditCard className="text-4xl text-green-500 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Secure Payments</h3>
          <p className="text-lg text-gray-600">
            Shop with confidence using our safe and secure payment options.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <FaHeadset className="text-4xl text-orange-500 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Customer Support</h3>
          <p className="text-lg text-gray-600">
            Our friendly support team is here to help with any questions or issues.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <FaHandsHelping className="text-4xl text-purple-500 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">Community Impact</h3>
          <p className="text-lg text-gray-600">
            We believe in giving back to our community with every purchase.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          At UrbanMart, we are committed to providing the best online shopping experience. From high-quality products to secure transactions and fast delivery, our goal is to make your shopping journey smooth and enjoyable. Join the UrbanMart family today and explore a world of convenience and style!
        </p>
        <a href="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 hover:bg-blue-500">
          Start Shopping
        </a>
      </div>
    </div>
  );
};

export default About;
