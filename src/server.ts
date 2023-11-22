import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";

async function server() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log(`Server: http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

server();
