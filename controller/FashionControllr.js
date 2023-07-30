const AllProduct = require("../Model/HomeModel");

exports.Fashion = async(req,res)=>{

    const allData = await AllProduct.find({$or:[{category:"men's clothing"},{category:"women's clothing"}]});
    // console.log("allData  ",allData);
    res.status(200).json({
        allData
    });
}