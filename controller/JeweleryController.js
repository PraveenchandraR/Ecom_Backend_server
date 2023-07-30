const AllProduct = require("../Model/HomeModel");

exports.Jewelery = async(req,res)=>{

    const allData = await AllProduct.find({category:"jewelery"});
    // console.log("allData  ",allData);
    res.status(200).json({
        allData
    });
}