import mongoose from 'mongoose';
import supertest from "supertest";
import { createServer } from "../utils/server"
import * as UserService from '../service/user.service'
import * as SessionService from '../service/session.service'
import { createUserSessionHandler } from '../controller/session.controller';

const app = createServer()

const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  _id: userId,
  email: 'testuser@test.com',
  name: 'Test user',
}

const userInput = {
  email: 'testuser@test.com',
  name: 'Test user',
  password: 'testpassword1234',
  passwordConfirmation: 'testpassword1234',
}

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  userId,
  isValid: true,
  createdAt: new Date("2027-10-29T14:33:07.674Z"),
  updatedAt: new Date("2027-10-29T15:31:07.674Z"),
  __v: 0,
}

describe('User', () => {
  describe('User registration', () => {
    describe('Given a valid email and password', () => {
      it('should create the user and return the user payload', async () => {
        const mockCreateUserService = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockResolvedValueOnce(userPayload)

        const { body, statusCode } = await supertest(app).post('/api/users').send(userInput)

        expect(statusCode).toBe(200)
        expect(body).toEqual(userPayload)

        expect(mockCreateUserService).toHaveBeenCalledWith(userInput)
      })
    })
    describe('Given two passwords that do not match', () => {
      it('should return a 400', async () => {
        const mockCreateUserService = jest
          .spyOn(UserService, 'createUser')
          // @ts-ignore
          .mockResolvedValueOnce(userPayload)

        const { statusCode } = await supertest(app).post('/api/users').send({ ...userInput, passwordConfirmation: 'wrongpassword1234' })

        expect(statusCode).toBe(400)

        expect(mockCreateUserService).not.toHaveBeenCalledWith()
      })
    })

    describe('Given the user service throws an error', () => {
      it('should return a 409 status error', async () => {
        const mockCreateUserService = jest
          .spyOn(UserService, 'createUser')
          .mockRejectedValueOnce('✅ An error occurred')

        const { statusCode } = await supertest(app).post('/api/users').send(userInput)

        expect(statusCode).toBe(409)

        expect(mockCreateUserService).toHaveBeenCalled()
      })
    })
  })

  describe('Create user session', () => {
    describe('Given a valid email and password', () => {
      it('should return a signed accessToken and refreshToken', async () => {
        jest
          .spyOn(UserService, "validateUser")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          body: {
            email: "test@example.com",
            password: "Password123",
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      })
    })
  })
})