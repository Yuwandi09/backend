import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  firstName:{ 
    type: String, 
    required: true 
  },
  lastName:{ 
    type: String, 
    required: true  
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: String,
    default: 'customer'
  },
  isBlocked:{
    type: Boolean,
    default: false
  },
  img:{
    type: String,
    default: "https://avatar.iran.liara.run/public/boy?username=Ash"
  }
});

const User = mongoose.model("users", userSchema);

export default User;
