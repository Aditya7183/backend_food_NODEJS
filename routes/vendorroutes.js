const vendorcontroller =require('../controllers/vendorcontrollers')
const express =require('express')

const  router =express.Router();
router.post('/register',vendorcontroller.vendorRegister);
router.post('/login',vendorcontroller.vendorlogin);


router.get('/all-vendors',vendorcontroller.getAllVendors);
router.get('/single-vendor/:id',vendorcontroller.getVendorBYId)

module.exports = router;