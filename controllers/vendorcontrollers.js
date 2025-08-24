const Vendor =require('../models/Vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotEnv =require('dotenv');

dotEnv.config();
const secretkey =process.env.WhatIsYourName
const vendorRegister =async(req,res)=>{
    const{username ,email,password}=req.body;
    try{
        const vendoremail = await Vendor.findOne({email});
        if(vendoremail){
            return res.status(400).json("email already taken");
        }
        const hashpassword = await bcrypt.hash(password,10);
        const newvendor =new Vendor({
            username,
            email,
            password:hashpassword
        });
        await newvendor.save();
        res.status(201).json({message:"vendor registered"})
        console.log("registered")
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})

    }
}
const vendorlogin =async(req,res)=>{
    const {email,password}=req.body;
    try{
        const vendor =await Vendor.findOne({email});
        if(!vendor ||!(await bcrypt.compare(password,vendor.password))){
            return  res.status(401).json({error:"invalid username or password"})
        }
        const token = jwt.sign({vendorId :vendor._id},secretkey,{expiresIn:"1h"})
        const vendorId =vendor._id;
        res.status(200).json({success:"login successful",token,vendorId})
        console.log(email,"this is token ",token);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }

}
const getAllVendors =async(req,res)=>{
    try{
        const vendors =await Vendor.find().populate('firm');
        res.json({vendors})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

const getVendorBYId = async (req, res) => {
    const vendorId = req.params.vendorId;  // ✅ fix here
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ error: "vendor not found" });
        }

        // check if firm exists before accessing
        const vendorFirmId = vendor.firm.length > 0 ? vendor.firm[0]._id : null;

        res.status(200).json({ vendorId, vendorFirmId });
        console.log("Vendor Firm Id:", vendorFirmId);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports ={vendorRegister,vendorlogin,getAllVendors,getVendorBYId}