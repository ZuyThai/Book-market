require('dotenv').config()
const { connectDB } = require('./src/config/db');
connectDB();

const express = require('express');

const app = express();
const cors = require('cors');

const authRoute = require('./src/routers/authRoute');
const productRoute = require('./src/routers/productRoute');
const userRoute = require('./src/routers/userRoute');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/user', userRoute);
app.get('/test', (req, res) => res.send('halo'));

//err
app.all('*', (req, res, next) => {
  const err = new Error('Page not found');
  err.statusCode = 404;
  next(err);
})

const port = process.env.APP_PORT
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`))