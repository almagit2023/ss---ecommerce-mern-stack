import { setUser, setUserProfile } from "@/redux/slice/user";
import {
  changePicture,
  fetchProfile,
  updateProfile,
} from "@/services/operations/user";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingCart,
  FaEdit,
} from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Loader, Pen } from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { token, userProfile } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    fullAddress: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (userProfile) {
      setEditData({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        fullAddress: userProfile.address?.fullAddress || "",
        city: userProfile.address?.city || "",
        state: userProfile.address?.state || "",
      });
    }
  }, [userProfile]);

  const imageRef = useRef(null);

  const fullName = `${userProfile?.firstName || ""} ${
    userProfile?.lastName || ""
  }`.trim();

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
        const imagePre = URL.createObjectURL(file);
        setImagePreview(imagePre);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const result = await fetchProfile(token);
      if (result) {
        dispatch(setUserProfile(result));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditData({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      fullAddress: userProfile.address?.fullAddress || "",
      city: userProfile.address?.city || "",
      state: userProfile.address?.state || "",
    });
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(editData, token);
      if (res) {
        dispatch(setUser(res));
        dispatch(setUserProfile(res));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileSubmit = async () => {
    try {
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      setLoading(true);
      const res = await changePicture(formData, token);
      if (res) {
        toast.success("Profile Picture Changes");
        dispatch(setUser(res));
        dispatch(setUserProfile(res));
        setImagePreview(null);
      }
    } catch (error) {
      toast.error("Something Went Wrong While Changing Profile Picture");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token, location.pathname]);

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg font-semibold">
          No profile data found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[87vh] bg-gray-100 px-4 gap-6">
      <div className="relative">
        {!imagePreview && (
          <img
            src={
              userProfile?.image && userProfile.image.trim() !== ""
                ? userProfile.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                    fullName
                  )}`
            }
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e)}
        />
        <div
          onClick={() => imageRef.current.click()}
          className="absolute top-0 -right-4"
        >
          <Edit
            size={36}
            className="text-blue-600 active:bg-slate-900 cursor-pointer hover:bg-blue-950 transition-all duration-300 rounded-full p-1.5"
          />
        </div>
        {imagePreview && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setImagePreview(null)}
              className="w-fit p-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleFileSubmit}
              className="w-fit p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200"
            >
              {loading ? (
                <Loader className="text-white animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        )}
      </div>
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
            <FaUser className="text-blue-500" />
            Profile Details
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <FaEdit />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  label="First Name"
                  value={editData.firstName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, firstName: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
                  value={editData.lastName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, lastName: e.target.value })
                  }
                />
                <Input
                  label="Email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
                <Input
                  label="City"
                  value={editData.city}
                  onChange={(e) =>
                    setEditData({ ...editData, city: e.target.value })
                  }
                />
                <Input
                  label="State"
                  value={editData.state}
                  onChange={(e) =>
                    setEditData({ ...editData, state: e.target.value })
                  }
                />
                <Input
                  label="Full Address"
                  value={editData.fullAddress}
                  onChange={(e) =>
                    setEditData({ ...editData, fullAddress: e.target.value })
                  }
                />
              </div>
              <DialogFooter>
                <Button onClick={() => setEditData(userProfile)}>Cancel</Button>
                <Button onClick={handleSave} className="bg-blue-500 text-white">
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Name:</span>{" "}
              {`${userProfile.firstName} ${userProfile.lastName}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Email:</span> {userProfile.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Location:</span>{" "}
              {`${userProfile.address?.city}, ${userProfile.address?.state}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Full Address:</span>{" "}
              {userProfile.address?.fullAddress}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Account Created:</span>{" "}
              {new Date(userProfile.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Last Updated:</span>{" "}
              {new Date(userProfile.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaShoppingCart className="text-blue-500" />
            <p className="text-gray-800">
              <span className="font-semibold">Purchases:</span>{" "}
              {userProfile.purchases?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
