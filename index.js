require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connection');
const authRouter = require('./routers/auth');
const jobsRouter = require('./routers/jobs');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const authenticationMiddleware = require('./middleware/authentication');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const PORT = process.env.PORT || 5500;

const app = express();

app.set('trust proxy', 1);

app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);
app.use('/api/v1/auth', authRouter);

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
