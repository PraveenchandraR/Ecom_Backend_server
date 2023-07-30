const AllProduct = require("../Model/HomeModel");

exports.Electronic= async(req,res)=>{
    
    const allData = await AllProduct.find({category:"electronics"});
    res.status(200).json({
        allData
    });
}