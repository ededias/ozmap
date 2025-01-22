import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  MONGO_URI: process.env.MONGO_URI || '',
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
};

// const init = async function() {
//   await mongoose.connect(env.MONGO_URI);
// };

export default connectToDatabase();
