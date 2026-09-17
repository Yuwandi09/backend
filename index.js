import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
//import dns from 'dns';
import jwt from 'jsonwebtoken';

import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';


//dns.setServers(['8.8.8.8', '1.1.1.1']);


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  const tokenString = req.header("Authorization");
  if(tokenString){
    const token = tokenString.replace("Bearer ", "");
    //console.log(token);

    jwt.verify(token, "yuwa@2004", (err, decoded) => {
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


mongoose.connect("mongodb+srv://admin:123@cluster0.qkl5uv4.mongodb.net/?appName=Cluster0").then(()=>{
  console.log('connected to database');})
  .catch((error) => {
    console.log("connection failed:", error.message);
  });


app.use("/products",productRouter);
app.use("/users",userRouter);

app.listen(5000,()=>{
  console.log('server is running on port 5000');
});
//mongodb+srv://admin:123@cluster0.qkl5uv4.mongodb.net/?appName=Cluster0