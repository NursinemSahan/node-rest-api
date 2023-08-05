const express=require("express");
const app=express();
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const productRoute = require("./routes/productRoute");
const errorMiddleware =  require("./middleware/errorMiddleware");
const cors = require("cors");

const MONGO_URL= process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
    origin: FRONTEND ,
    optionsSuccessStatus : 200  //some legacy browsers (IE11, various smarttvs) choke on 204
};

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/products",productRoute);
app.use(cors(corsOptions));



app.get("/", (req, res)=>{
   res.send("getting the home");

});


app.use(errorMiddleware);

mongoose.set("strictQuery",false);

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("db connected");
    app.listen(PORT, ()=>{
        console.log(`listening on port ${PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});


