import mongoose from 'mongoose';
import supertest from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';

import { createProduct } from '../service/product.service';
import { createServer } from './../utils/server';
import { signJWT } from '../utils/jwt.utils';
import e from 'express';

const app = createServer()

const userId = new mongoose.Types.ObjectId().toString()

const productPayload = {
  userId,
  title: 'Test product',
  description: 'Test description',
  price: 999,
  image: 'https://test.com/image.png',
}

const userPayload = {
  _id: userId,
  email: 'test@test.com',
  name: 'Test user',
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
        const { statusCode, body } = await supertest(app)
          .get(`/api/product/${product.productId}`)
          .expect(200)

        expect(statusCode).toBe(200)
        expect(body.productId).toBe(product.productId)
      })
    })
  })

  describe('Create product route', () => {
    describe('Given the user is not loggen in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).post('/api/product')

        expect(statusCode).toBe(403)
      })
    })

    describe('Given the user is logged in', () => {
      it('should return a 200 and create the product', async () => {
        const accessToken = signJWT(userPayload, 'accessTokenPrivateKey', { expiresIn: '5m' })

        const { statusCode, body } = await supertest(app)
          .post('/api/product')
          .set('Authorization', `Bearer ${accessToken}`)
          .send(productPayload)

        expect(statusCode).toBe(200)
        expect(body).toEqual({
          userId: expect.any(String),
          title: 'Test product',
          description: 'Test description',
          price: 999,
          image: 'https://test.com/image.png',
          _id: expect.any(String),
          productId: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0
        })
      })
    })
  })
});