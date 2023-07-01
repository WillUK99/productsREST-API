import log from "../logger";
import ProductModel, { ProductDocument, ProductInput } from "../model/product.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export const createProduct = async (productInput: ProductInput) => {
  try {
    const product = await ProductModel.create(productInput);
    return product ? product : false;
  }
  catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const getProduct = async (productData: FilterQuery<ProductDocument>) => {
  try {
    const product = await ProductModel.findOne(productData).lean();
    return product ? product : false;
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

export const updateProduct = async (productData: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>) => {
  try {
    const product = await ProductModel.findOneAndUpdate(productData, update, { new: true }).lean();
    return product ? product : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const deleteProduct = async (productData: FilterQuery<ProductDocument>) => {
  try {
    console.log(productData);
    const product = await ProductModel.findOneAndDelete(productData).lean();
    return product ? product : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}