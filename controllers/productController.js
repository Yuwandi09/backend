import Product from '../models/product.js';
import { isAdmin } from './userController.js';

export async function getProducts(req, res) {
    // Product.find()
    //   .then((data) => {
    //     res.json(data);
    //   })
    // .catch((err) => {
    //   res.status(500).json({ message: "Error retrieving products" });

    try{
      if(isAdmin(req)){
          const products = await Product.find()
           res.json(products)
      }else{
        const products = await Product.find({isAvailable:true})
        res.json(products)
      }
      
    }catch(err){
      res.status(500).json({
        message:"Failed to get products",
        error:err
      })
    }
    };

export function saveProduct(req, res) {
  //console.log(req.body);

  if(!isAdmin(req)){
    res.status(403).json({
      message: "you are not authorized to add a product"
    });
  return;
  }

    const product= new Product(
          req.body
    );

    product.save().then(()=>{
      res.json({
        message:"product added successfully"
      })
    }).catch((err)=>{      
      res.status(500).json({
        message:"product not added"
      })
      console.log(err);
    })
} 

export async function deleteProduct(req, res) {
  if(!isAdmin(req)){
    res.status(403).json({
      message: "you are not authorized to delete a product"
    });
  return;
  }

  try{

      await Product.deleteOne({productId:req.params.productId});
      res.json(
        { message: "Product deleted successfully" }
      );

  }catch(err){
    res.status(500).json({
      message:"product not deleted",
      error:err
    })
  }
}