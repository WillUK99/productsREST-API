import { Request, Response } from 'express'
import log from '../logger'
import { asyncHandler } from '../utils/async.utils'
import { CreateProductInput, UpdateProductInput, DeleteProductInput, GetProductInput } from '../schema/product.schema'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../service/product.service'

export const createProductHandler = asyncHandler(async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
  const userId = res.locals.user._id

  if (!userId) return res.sendStatus(401)

  try {
    const productData = req.body
    const product = await createProduct({ ...productData, userId })
    return res.json(product)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
})

export const getProductHandler = asyncHandler(async (req: Request<GetProductInput['params']>, res: Response) => {
  const userId = res.locals.user._id

  if (!userId) return res.sendStatus(401)

  try {
    const productId = req.params.productId
    const product = await getProduct({ productId })

    if (!product) return res.sendStatus(404)

    return res.json(product)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
})

export const getAllProductsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = res.locals.user._id

  if (!userId) return res.sendStatus(401)

  try {
    const products = await getAllProducts()
    return res.json(products)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
})

export const updateProductHandler = asyncHandler(async (req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>, res: Response) => {
  const userId = res.locals.user._id

  if (!userId) return res.sendStatus(401)

  try {
    const productId = req.params.productId
    const productDataToUpdate = req.body
    const product = await getProduct({ productId })

    if (!product) return res.sendStatus(404)
    if (product.userId !== userId) return res.sendStatus(403)

    const updatedProduct = await updateProduct({ product }, productDataToUpdate)

    return res.json(updatedProduct)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
})

export const deleteProductHandler = asyncHandler(async (req: Request<DeleteProductInput['params'], {}, {}>, res: Response) => {
  const userId = res.locals.user._id

  if (!userId) return res.sendStatus(401)

  try {
    const productId = req.params.productId
    const product = await getProduct({ productId })

    if (!product) return res.sendStatus(404)
    if (product.userId !== userId) return res.sendStatus(403)

    const deletedProduct = await deleteProduct({ product })

    return res.json(deletedProduct)
  } catch (e: any) {
    log.error(e)
    return res.sendStatus(400)
  }
})