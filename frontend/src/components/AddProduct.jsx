import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addProductFunction } from "@/services/operations/product";
import { setAllProducts } from "@/redux/slice/product";
import { Loader } from "lucide-react";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);

  const imageOneRef = useRef();
  const imageTwoRef = useRef();
  const imageThreeRef = useRef();
  const imageFourRef = useRef();

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

  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    category: "",
    price: null,
    stock: null,
    supplier: "",
    warranty: "",
    returnPolicy: "",
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    imageFour: null,
    targetedAudience: "",
  });

  const [imageOnePreview, setImageOnePreview] = useState("");
  const [imageTwoPreview, setImageTwoPreview] = useState("");
  const [imageThreePreview, setImageThreePreview] = useState("");
  const [imageFourPreview, setImageFourPreview] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const { token } = useSelector((state) => state.user);

  const handleFileChangeForImageOne = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductDetails((prev) => ({ ...prev, imageOne: file }));
      const imagePreview = URL.createObjectURL(file);
      setImageOnePreview(imagePreview);
    }
  };

  const handleFileChangeForImageTwo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductDetails((prev) => ({ ...prev, imageTwo: file }));
      const imagePreview = URL.createObjectURL(file);
      setImageTwoPreview(imagePreview);
    }
  };

  const handleFileChangeForImageThree = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductDetails((prev) => ({ ...prev, imageThree: file }));
      const imagePreview = URL.createObjectURL(file);
      setImageThreePreview(imagePreview);
    }
  };

  const handleFileChangeForImageFour = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductDetails((prev) => ({ ...prev, imageFour: file }));
      const imagePreview = URL.createObjectURL(file);
      setImageFourPreview(imagePreview);
    }
  };

  const handleAddProduct = async () => {
    console.log(productDetails);
    const formData = new FormData();
    formData.append("title", productDetails.title);
    formData.append("description", productDetails.description);

    formData.append("price", productDetails.price);
    formData.append("targetedAudience", productDetails.targetedAudience);
    formData.append("warranty", productDetails.warranty);
    formData.append("returnPolicy", productDetails.returnPolicy);
    formData.append("stock", productDetails.stock);
    formData.append("supplier", productDetails.supplier);
    formData.append("category", productDetails.category);
    formData.append("image", productDetails.imageOne);
    if (productDetails.imageTwo)
      formData.append("imageTwo", productDetails.imageTwo);
    if (productDetails.imageThree)
      formData.append("imageThree", productDetails.imageThree);
    if (productDetails.imageFour)
      formData.append("imageFour", productDetails.imageFour);
    try {
      console.log(formData);
      setLoading(true);
      const response = await addProductFunction(formData, token);
      if (response) {
        dispatch(setAllProducts([...allProducts, response]));
        setOpenDialog(false);
        setProductDetails({
          title: "",
          description: "",
          price: null,
          stock: null,
          warranty: "",
          returnPolicy: "",
          imageOne: null,
          imageTwo: null,
          imageThree: null,
          imageFour: null,
          targetedAudience: null,
          supplier: null,
          category: null,
        });
        setImageOnePreview("");
        setImageTwoPreview("");
        setImageThreePreview("");
        setImageFourPreview("");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={(isOpen) => setOpenDialog(isOpen)}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpenDialog(true)}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          Add Product
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Create New Product
          </DialogTitle>
          <DialogDescription className="mt-4 flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <input
                value={productDetails.title}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter Title Of The Product"
              />
              <select
                value={productDetails.category}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="bg-gray-100 rounded-md border p-2 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 text-gray-400"
              >
                <option value="">Select A Category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={productDetails.description}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter Description Of The Product"
              rows={3}
            ></textarea>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  ref={imageOneRef}
                  className="hidden"
                  onChange={(e) => handleFileChangeForImageOne(e)}
                />
                <button
                  onClick={() => imageOneRef.current.click()}
                  className="w-full p-6 border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-center"
                >
                  {imageOnePreview ? (
                    <div className="flex items-center gap-6 justify-center">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={imageOnePreview}
                        alt=""
                      />
                      <span className="font-bold text-gray-400">
                        {productDetails.imageOne.name}
                      </span>
                    </div>
                  ) : (
                    "Upload Image 1"
                  )}
                </button>
              </div>

              <div className="flex flex-col items-center">
                <input
                  onChange={(e) => handleFileChangeForImageTwo(e)}
                  type="file"
                  ref={imageTwoRef}
                  className="hidden"
                />
                <button
                  onClick={() => imageTwoRef.current.click()}
                  className="w-full p-6 border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-center"
                >
                  {imageTwoPreview ? (
                    <div className="flex items-center gap-6 justify-center">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={imageTwoPreview}
                        alt=""
                      />
                      <span className="font-bold text-gray-400">
                        {productDetails?.imageTwo?.name}
                      </span>
                    </div>
                  ) : (
                    "Upload Image 2"
                  )}
                </button>
              </div>

              <div className="flex flex-col items-center">
                <input
                  type="file"
                  ref={imageThreeRef}
                  className="hidden"
                  onChange={(e) => handleFileChangeForImageThree(e)}
                />
                <button
                  onClick={() => imageThreeRef.current.click()}
                  className="w-full p-6 border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-center"
                >
                  {imageThreePreview ? (
                    <div className="flex items-center gap-6 justify-center">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={imageThreePreview}
                        alt=""
                      />
                      <span className="font-bold text-gray-400">
                        {productDetails?.imageThree?.name}
                      </span>
                    </div>
                  ) : (
                    "Upload Image 3"
                  )}
                </button>
              </div>

              <div className="flex flex-col items-center">
                <input
                  type="file"
                  ref={imageFourRef}
                  className="hidden"
                  onChange={(e) => handleFileChangeForImageFour(e)}
                />
                <button
                  onClick={() => imageFourRef.current.click()}
                  className="w-full p-6 border border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg text-center"
                >
                  {imageFourPreview ? (
                    <div className="flex items-center gap-6 justify-center">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={imageFourPreview}
                        alt=""
                      />
                      <span className="font-bold text-gray-400">
                        {productDetails?.imageFour?.name}
                      </span>
                    </div>
                  ) : (
                    "Upload Image 4"
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                type="number"
                placeholder="Enter Price Of The Product"
              />
              <input
                value={productDetails.stock}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Stocks Available"
              />
              <select
                value={productDetails.targetedAudience}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    targetedAudience: e.target.value,
                  }))
                }
                className="bg-gray-100 rounded-md border p-2 border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 text-gray-400"
              >
                <option value="">Select Targeted Audience</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Children">Children</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <input
                value={productDetails.supplier}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    supplier: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Supplier"
              />
              <input
                value={productDetails.warranty}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    warranty: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Warranty"
              />
              <input
                value={productDetails.returnPolicy}
                type="text"
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    returnPolicy: e.target.value,
                  }))
                }
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Return Policy"
              />
            </div>

            <button
              onClick={handleAddProduct}
              className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700"
            >
              {loading ? (
                <div className="w-full flex items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                "Add Product"
              )}
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
