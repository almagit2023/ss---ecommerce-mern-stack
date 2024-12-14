import { CarTaxiFront, LogOut, ShoppingBag } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { IoCartOutline } from "react-icons/io5";
import { MdDashboard, MdEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setToken, setUser } from "@/redux/slice/user";
import toast from "react-hot-toast";
import Cart from "./Cart";

const Navbar = () => {
  const { user, isAdmin } = useSelector((state) => state.user);
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged Out Successfully");
  };

  const navLinks = [
    { path: "/", label: "Collection" },
    { path: "/men-special", label: "Men" },
    { path: "/women-special", label: "Women" },
    { path: "/children-special", label: "Children" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="w-full p-5 border-b border-gray-300 flex justify-between mt-4 relative">
      <div className="flex items-center gap-14">
        <p className="text-2xl font-bold select-none">UrbanMart</p>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`relative cursor-pointer transition-all duration-300 pb-2 ${
              location.pathname === link.path
                ? "text-black font-semibold after:absolute after:left-0 after:bottom-[-20px] after:w-full after:h-[6px] after:bg-orange-500"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-8 items-center">
        {isAdmin === false && <Cart />}
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    user.image
                      ? `${user?.image} `
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`
                  }
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-gray-800 p-6 text-gray-400 rounded-md z-10">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold text-gray-400 select-none">
                  {user?.firstName} {user?.lastName}
                </span>
                <div className="flex gap-4 items-center select-none py-2">
                  <MdEmail />
                  <span className="text-sm text-gray-500">{user?.email}</span>
                </div>
                <div onClick={()=>navigate(`/profile`)} className="flex gap-4 items-center hover:bg-slate-200 py-2 rounded cursor-pointer">
                  <FaRegUser />
                  <span className="text-sm text-gray-500">Profile</span>
                </div>
                {isAdmin === true && (
                  <div
                    onClick={() => navigate(`/admin-dashboard`)}
                    className="flex gap-4 items-center hover:bg-slate-200 py-2 rounded cursor-pointer"
                  >
                    <MdDashboard />
                    <span className="text-sm text-gray-500">
                      Admin Dashboard
                    </span>
                  </div>
                )}
                {isAdmin === false && (
                  <div
                    onClick={() => navigate(`/purchases`)}
                    className="flex gap-4 items-center hover:bg-slate-200 py-2 rounded cursor-pointer"
                  >
                    <ShoppingBag />
                    <span className="text-sm text-gray-500">
                      My Purchases
                    </span>
                  </div>
                )}
                <div
                  onClick={handleLogout}
                  className="flex gap-4 items-center hover:bg-slate-200 py-2 rounded cursor-pointer"
                >
                  <LogOut />
                  <span className="text-sm text-gray-500">Logout</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Navbar;
