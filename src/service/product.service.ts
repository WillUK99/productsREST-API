import log from "../logger";
import ProductModel, { ProductDocument, ProductInput } from "../model/product.model";
import { FilterQuery, UpdateQuery } from "mongoose";

export const createProduct = async (productInput: ProductInput) => {
  try {
    const product = await ProductModel.create(productInput);
    return product.toJSON();
  }
  catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const getProduct = async (searchQuery: FilterQuery<ProductDocument>) => {
  try {
    const product = await ProductModel.findOne(searchQuery).lean();
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

export const updateProduct = async (searchQuery: FilterQuery<ProductDocument>, update: UpdateQuery<ProductDocument>) => {
  try {
    const product = await ProductModel.findOneAndUpdate(searchQuery, update, { new: true }).lean();
    return product ? product.toJSON() : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}

export const deleteProduct = async (searchQuery: FilterQuery<ProductDocument>) => {
  try {
    const product = await ProductModel.findOneAndDelete(searchQuery).lean();
    return product ? product.toJSON() : false;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
}