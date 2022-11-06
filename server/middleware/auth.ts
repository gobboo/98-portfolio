import jwt from 'jsonwebtoken';
import { sendError } from 'h3';

import { User } from '../db/User';

export default defineEventHandler(async (event) => {
  // Check if we need to Authenticate
  let { authorization } = event.req.headers;

  if (!authorization) { return; }
  authorization = authorization.replace('Bearer ', '')

  const config = useRuntimeConfig();
  // Check JWT
  const isValid = jwt.verify(authorization, config.JWT_SECRET);

  if (!isValid) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized', data: 'Could not verify user authenticity, please relogin.' }))
  }

  const decodedUser = jwt.decode(authorization, config.JWT_SECRET);
  
  const user = await User.findOne({ _id: decodedUser._id });

  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized', data: 'Could not verify user authenticity, please relogin.' }))
  }

  event.req["user"] = user;
})