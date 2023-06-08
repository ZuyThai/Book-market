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
app.use('*', (err, req, res, next) => {
  const message = err.message || "Server is not respond";
  const status = err.status || 500;
  // if (req.url === '/ping.html' && req.method ==='GET') {
  //     //AWS ELB pings this URL to make sure the instance is running
  //     //smoothly
  //     res.writeHead(200, {
  //         'Content-Type': 'text/plain',
  //         'Content-Length': 2
  //     });
  //     res.write('OK');
  //     res.end();
  // }
  res.status(status).json({message});
})

const port = process.env.APP_PORT
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`))