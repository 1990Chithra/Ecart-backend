
const products=require('../Models/productSchema');
//get allproducts from the database

exports.getAllProducts=async(req,res)=>{
    //get all product from the mongoDB- find()
    try{
        const AllProducts= await products.find()
        res.status(200).json(AllProducts)


    }
    catch(err){
        res.status(404).json(err)
    }
}
//get a product details
exports.getProduct=async(req,res)=>{

    const {id}=req.params
    //get a particular product details from the database-findOne()
    try{
        getAProduct=await products.findOne({id})
        res.status(200).json(getAProduct)

    }
    catch(err){
        res.status(404).json(err)
    }
}

