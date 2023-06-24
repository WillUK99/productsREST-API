import log from "../logger";
import ProductModel from "../model/product.model";

export const createProduct = async (userId: string, title: string, description: string, price: number, image: string) => {
  try {
    const product = await ProductModel.create({ userId, title, description, price, image });
    return product.toJSON();
  }
  catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const getProduct = async (productId: string) => {
  try {
    const product = await ProductModel.findOne({ productId }).lean();
    return product ? product.toJSON() : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const getAllProducts = async () => {
  try {
    const products = await ProductModel.find({}).lean();
    return products;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const updateProduct = async (productId: string, title: string, description: string, price: number, image: string) => {
  try {
    const product = await ProductModel.findOneAndUpdate({ productId }, { title, description, price, image }, { new: true }).lean();
    return product ? product.toJSON() : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const deleteProduct = async (productId: string) => {
  try {
    const product = await ProductModel.findOneAndDelete({ productId }).lean();
    return product ? product.toJSON() : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}