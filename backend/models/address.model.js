import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
