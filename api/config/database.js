import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log('Error connecting to mongoDD: ', err);
    process.exit(1); // exit process with failure
  }
};

export default connectDb;
