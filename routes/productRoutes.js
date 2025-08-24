// const express =require('express');
// const productController =require("../controllers/productcontroller")

// const router =express.Router()
// router.post('/add-product/:firmId',productController.addProduct);
// router.get('/:firmId/products',productController.getProductByFirm)

// router.get('/uploads/:imageName',(req,res)=>{
//   const imageName=req.params.imageName;
//   res.headersSent('Content-Type','image/jpeg');
//   res.sendFile(Path.join(__dirname,'..','uploads',imageName));
// });
// router.delete('/:productId', productController.deleteProducctById);

// module.exports =router;

const express = require('express');
const productController = require("../controllers/productcontroller");
const path = require('path');   // ✅ import path

const router = express.Router();

// Add product
router.post('/add-product/:firmId', productController.addProduct);

// Get products by firm
router.get('/:firmId/products', productController.getProductByFirm);

// Serve uploaded images
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader('Content-Type', 'image/jpeg');   // ✅ fix header
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// Delete product by id
router.delete('/:productId', productController.deleteProducctById);  // ✅ matches controller

module.exports = router;
