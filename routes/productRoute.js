import express from 'express';
import { getProducts, saveProduct, deleteProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",getProducts);
productRouter.post("/",saveProduct);
productRouter.delete("/:productId",deleteProduct);
productRouter.put("/:productId",updateProduct);

export default productRouter;
