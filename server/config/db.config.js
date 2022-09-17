import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ debug: true });

//Reading the process.argv to determine if we're running on Prod or on Dev
let ENVIRONMENT = '';
process.argv[2] === 'prod' ? (ENVIRONMENT = 'prod') : (ENVIRONMENT = 'dev');

/**
 * @description make connection to a database
 * @param  {any} uri (URI of the targeted database )
 * @param  {any} name (string: the name of the database)
 */
export const ConnectDB = async (MONGO_URI, name) => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on('open', () =>
      console.log(`MongoDB :: ${name} database is connected`)
    );
    mongoose.connection.on('error', (err) => console.log(err.message));
  } catch (error) {
    console.error('connection to db failed', error.message);
  }
};
