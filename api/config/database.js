import mongoose from 'mongoose';

// const uri =
//   'mongodb+srv://keyurchaudharicareer:enpqS7o0Jzsub19P@tinder.qywm4fj.mongodb.net/?retryWrites=true&w=majority&appName=Tinder';

// const connectionOptions = {
//   dbName: 'Swipe'
// };

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
