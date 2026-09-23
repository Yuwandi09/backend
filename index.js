import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';

//import dns from 'dns';
//dns.setServers(['8.8.8.8', '1.1.1.1']);
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if(tokenString){
    const token = tokenString.replace("Bearer ", "");
    //console.log(token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decoded != null){
        //console.log(decoded);
        req.user = decoded;
        next();
      }else{
        console.log("invalid token");
        res.status(401).json({
          message: "Invalid token"
        });
      }
    }
    )
  }else{
      next()
    }
})


mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('connected to database');})
  .catch((error) => {
    console.log("connection failed:", error.message);
  });


app.use("/products",productRouter);
app.use("/users",userRouter);
app.use("/orders",orderRouter);

app.listen(5000,()=>{
  console.log('server is running on port 5000');
});
//mongodb+srv://admin:123@cluster0.qkl5uv4.mongodb.net/?appName=Cluster0

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbGl0aEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJNYWxpdGgiLCJsYXN0TmFtZSI6InByYXZlZW4iLCJyb2xlIjoiYWRtaW4iLCJpbWciOiJodHRwczovL2F2YXRhci5pcmFuLmxpYXJhLnJ1bi9wdWJsaWMvYm95P3VzZXJuYW1lPUFzaCIsImlhdCI6MTc4OTk1OTIzMX0.oDkillriZQQPVRnJY3tiajtl_qGfFZM3rol75OF_etA