import mongoose from 'mongoose';
import supertest from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createProduct } from '../service/product.service';
import { createServer } from './../utils/server';

const app = createServer()

const userId = new mongoose.Types.ObjectId().toString()

const productPayload = {
  userId,
  title: 'Test product',
  description: 'Test description',
  price: 999,
  image: 'https://test.com/image.png',
}

describe('Products', () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  })

  describe('Get products route', () => {
    describe('Given a product that does not exist', () => {
      it('should return a 404', async () => {
        const productId = 'product_1'
        await supertest(app).get(`/api/product/${productId}`).expect(404)
      })
    })

    describe('Given a product that does exist', () => {
      it('should return product and 200 status code', async () => {
        const product = await createProduct({ ...productPayload })
        const { statusCode, body } = await supertest(app).get(`/api/product/${product.productId}`).expect(200)

        expect(statusCode).toBe(200)
        expect(body.productId).toBe(product.productId)
      })
    })
  })
});