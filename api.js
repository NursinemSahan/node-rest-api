const express=require("express");
const app=express();
const mongoose = require("mongoose");
const Product = require("./models/productModel");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res)=>{
    res.send("getting the home");

});


app.post("/products", async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);

    }catch(error){
        console.log(error);
        res.send(500).json({message: error.message});
    }
})

app.get("/products", async(req, res)=>{
    try {
        const products= await Product.find({});
        res.status(200).send(products);

    } catch (error) {
        console.log(error);
        res.send(404).json({message: error.message})
    }
});

app.get("/products/:id", async(req, res)=>{
    try {
        const product= await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.send(500).json({message : error.message});
    }
})

app.put("/products/:id", async(req, res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if(!product){
            return res.send(404).send("not found")
        }
        const updatedProduct=await Product.findById(req.params.id)
        return res.status(200).send(updatedProduct);
        
    } catch (error) {
        console.log(error);
        res.send(500).json({message : error.message});
    }
})

app.delete("/products/:id", async(req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).send("not found");
        }

        return res.status(200).send(product);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }


})


mongoose.set("strictQuery",false);

mongoose.connect("mongodb+srv://sinemsahan:sinem1234@node.d09vdi0.mongodb.net/")
.then(()=>{
    console.log("db connected");
    app.listen(3000, ()=>{
        console.log("listening on port 3000");
    });
}).catch((error)=>{
    console.log(error);
});


