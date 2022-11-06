import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken'
/*
Authentication Handler

/auth - USERNAME, PASSWORD | POST | JWT Token?
/auth/callback - CODE | POST | JWT TOKEN?

*/
import { sendError, H3Error } from 'h3';
import joi from 'joi';
import { User } from '~~/server/db/User';
import validateData from '~~/server/validators';

const schema = joi.object({
  username: joi.string().alphanum().min(2).max(16).required(),
  password: joi.string().required()
})

export default defineEventHandler(async event => {
  const config = useRuntimeConfig()
  const { username, password } = await useBody(event);
  console.log(username, password)
  // Validate input
  const isValid: Boolean | H3Error = await validateData(schema, { username, password });
  if (isValid instanceof H3Error) {
    return sendError(event, isValid);
  }

  const user = await User.findOne({ username });

  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized', data: 'Invalid Username or Password' }))
  }
  console.log(user);
  const isCorrectPassword: Boolean = await compare(password, user.password)

  if (!user || !isCorrectPassword) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Bad Login', data: 'The Username or Password you\'ve entered is incorrect.' }))
  }

  // JWT

  return { accessToken: jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' }) };
})