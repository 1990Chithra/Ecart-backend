const {response}=require('express')
const wishlists=require('../Models/wishlistSchema')


exports.addWishlist=async(req,res)=>{
    console.log("inside the addtowishlist");
    //get product id
    const {id,title,price,image}=req.body
    const userId=req.payload
    
    //add the product details into the database
    try{
        const existingProduct=await wishlists.findOne({id})
        if(existingProduct){
            res.status(404).json("Product already exists")

        }
        else{
            const newProduct=new wishlists({
                id,title,price,image,userId
            })
            await newProduct.save()
            res.status(200).json("Product added successfully")

        }

    }
    catch(err){
        res.status(500).json({error:err})
    }
}
//get all wishlist
exports.getWishlist=async(req,res)=>{
    try{
        const wishlistProduct= await wishlists.find()
        if(wishlistProduct){
            res.status(200).json(wishlistProduct)

        }
        else{
            res.status(404).json("Product not found")

        }

    }
    catch(err){
        res.status(500).json({error:err})
    }
}

//delete from wishlist

exports.deleteFromWishlist=async(req,res)=>{

    const {id}=req.params
    try{
        const deleteItem=await wishlists.deleteOne({id})
        if(deleteItem){
            const wishlistProduct= await wishlists.find()
            res.status(200).json(wishlistProduct)
        }
    }
    catch(err){
        res.status(500).json({error:err})

    }
}