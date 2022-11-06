
/*
Authentication Handler

/auth - USERNAME, PASSWORD | POST | JWT Token?
/auth/callback - CODE | POST | JWT TOKEN?

*/
import { sendError, H3Error } from 'h3';
import { User } from '~~/server/db/User';
import { hash } from 'bcrypt';

import joi from 'joi';
import validateData from '~~/server/validators';
import { AccessKey } from '~~/server/db/AccessKey';


const schema = joi.object({
  username: joi.string().alphanum().min(2).max(16).required(),
  password: joi.string().regex(new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")).required(),
  email: joi.string().email().required()
})

export default defineEventHandler(async event => {
  const { username, password, accessKey } = await useBody(event);

  // Validate input
  const isValid: Boolean | H3Error = await validateData(schema, { username, password, accessKey });
  if (isValid instanceof H3Error) {
    return sendError(event, isValid);
  }

  try {
    // Check if key is valid
    const key = await AccessKey.findOne({ key: accessKey });

    if (!key) {
      return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized', data: 'Invalid Access Key' }))
    }

    // Maybe find one later?
    const encryptedPassword = await hash(password, 12)

    const user = await User.create({ username, password: encryptedPassword });

    return user;
  } catch (err) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Duplicate User', data: 'The Username you provided has been taken.' }));
  }
})