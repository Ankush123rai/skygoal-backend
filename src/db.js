const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const uri = process.env.MONGO_URI; 
    const uri="mongodb+srv://umakantbhendarkar94:Td8yUB87QW14FgSn@authenticcluster.iyo66pk.mongodb.net/Authentic";
    if (!uri) {
      throw new Error('MONGO_URI is not defined in the environment');
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
