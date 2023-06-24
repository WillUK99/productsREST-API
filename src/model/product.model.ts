import mongoose from "mongoose"
import { customAlphabet } from "nanoid"
import { UserDocument } from "./user.model"

export type ProductInput = {
  userId: UserDocument['_id'],
  title: string,
  description: string,
  price: number,
  image: string,
}

export type ProductDocument = mongoose.Document & {
  createdAt: Date,
  updatedAt: Date,
}

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
    default: () => `product_${nanoid()}`,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  }
}, {
  timestamps: true,
  collection: "products",
})

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema)

export default ProductModel
