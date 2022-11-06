import mongoose, { Mongoose } from 'mongoose';

let cachedMongoose: Mongoose = null

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  if (!cachedMongoose) {
    cachedMongoose = await mongoose.connect(config.mongoUri);
    console.log('Cached Mongoose');
  }
});