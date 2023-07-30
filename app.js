const express = require("express");
const morgan = require("morgan");
const cors  = require("cors")
const PageRouter =require("./Router/PageRouter");
const AuthRouter =require("./Router/AuthRouter");
const ProductRouter =require("./Router/ProductRoute"); 
const ProtectedRouter = require("./Router/ProtectedRoute");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({origin:"*"}));


app.use(express.json());
app.get('/homi', (req, res) => {
    res.send("homiconnected")
  })

app.use("/",PageRouter);
app.use("/auth",AuthRouter);
app.use("/products",ProductRouter);
app.use("/cart",ProtectedRouter);


module.exports = app;