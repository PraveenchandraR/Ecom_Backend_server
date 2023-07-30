const AllProduct = require("../Model/HomeModel");

exports.findProduct = async(req,res)=>{

    const product = await AllProduct.findById(req.params.id);
    // console.log("ID data  ",product);
    res.status(200).json({
        product
    });
}