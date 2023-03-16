import mongoose from "mongoose";
import envVariables from "./envVariables";

const DB_URI = envVariables.DB_URI;
const LIVE_URI = envVariables.LIVE_URI;

const dbConfig = async () => {
  try {
    const connect = await mongoose.connect(LIVE_URI);
    console.log(`database is connected to ${connect.connection.host}`);
  } catch (error) {
    console.log(`unable to connect to database ${error}`);
  }
};

export default dbConfig;
