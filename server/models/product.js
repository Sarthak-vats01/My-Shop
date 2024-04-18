import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: { type: String },
  sellerName: { type: String },
  productName: { type: String },
  productCategory: { type: String },
  color: { type: String },
  mrp: { type: Number },
  discount: { type: Number },
  discountedPrice: { type: Number },
  count: { type: Number },
  image: { type: Buffer },
  imageType: { type: String },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;
