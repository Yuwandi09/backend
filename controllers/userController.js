import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req, res) {

  if(req.body.role === "admin"){
    if(req.user != null){
      if(req.user.role != "admin"){res.status(403).json({
        message: "you are not authorized to create an admin account"
      });
    return;
  }
}else{
     res.status(403).json({
      message: "you are not authorized to create an admin account. Please login first"
    });
  return;
  }
}

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword,
    role: req.body.role,
    img: req.body.img
  });

  user.save()
    .then(() => {
      res.json({
        message: "User created successfully"
      });
    }).catch (
      (err) => {
      res.json({
        message: "User not created"
      });
      console.log(err);
    } )  
}
 
export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if(user==null){
        res.status(404).json({
          message: "User not found"
        });
      }else{
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        //genarete a token and send it to the client
        const token = jwt.sign(
          {"email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "role": user.role,
            "img": user.img
          },
         "yuwa@2004"
        )
        res.json({
          message: "Login successful",
          token: token
        });
      } else {
        res.status(401).json({
          message: "Invalid password"
        });
      }
        
     }
    })
}

export function isAdmin(req,res){
  if(req.user == null){
    return false
  }
  if(req.user.role != "admin"){
    return false
  }
  return true
}