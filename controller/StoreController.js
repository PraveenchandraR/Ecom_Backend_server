const AllProduct = require("../Model/HomeModel");
const APIFeatures = require("./ApiFeature");


exports.Store = async(req,res) =>{
   try {
        const feature = new APIFeatures(AllProduct.find(),req.query)
        .filter()
        .sort()
        .limit()
        .paginate();
        const Products = await feature.query;
        console.log(Products);
        res.status(200).json({
            Products
        });
   } catch (error) {
    
   }
}