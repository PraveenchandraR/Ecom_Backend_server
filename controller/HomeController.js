const AllProduct = require("../Model/HomeModel");



exports.HomeUrl = async(req,res)=>{

    let allData = null;
    if(req.query.limit){
        allData = await AllProduct.find({}).limit(req.query.limit);
    }else{
        allData = await AllProduct.find({});
    }

    
    // console.log("allData  ",allData);
    res.status(200).json({
        allData
    });
}



   