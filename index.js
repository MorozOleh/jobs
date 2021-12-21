require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connection");
const authRouter = require("./routers/auth");
const jobsRouter = require("./routers/jobs");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const PORT = process.env.PORT || 5500;

const app = express();

app.use(express.json());

app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
