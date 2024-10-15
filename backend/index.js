const express = require("express");
const expess = require("express");
const connection = require("./config/DB.JS");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const app = expess();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/auth", userRouter)
app.use("/api/products", productRouter)


app.listen(PORT, async() =>{
try{
    await connection;
    console.log(`Server is running on port:${PORT} && connected to DB successfully!`)
}catch(err){
    console.log( `Err ocured while connecting DB`)
}
})