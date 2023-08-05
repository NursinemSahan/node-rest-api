const asyncHandler =  require("express-async-handler")
const Product = require("../models/productModel")

const createProduct = asyncHandler(async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);

    }catch(error){
        res.status(500);
        throw new Error(error.message);
    }
});

const getProducts = asyncHandler(async(req, res)=>{
    try {
        const products= await Product.find({});
        res.status(200).send(products);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const getProduct = asyncHandler(async(req, res)=>{
    try {
        const product= await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const updateProduct = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if(!product){
            return res.send(404).send("not found")
        }
        const updatedProduct=await Product.findById(req.params.id)
        return res.status(200).send(updatedProduct);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const deleteProduct = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).send("not found");
        }

        return res.status(200).send(product);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }

});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct, 
    deleteProduct
}