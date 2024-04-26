const carts=require('../Models/cartSchema')

exports.addToCart=async(req,res)=>{
    const {id,title,price,image,quantity}=req.body
    try{

        const cartItem=await carts.findOne({id})
        if(cartItem){
            cartItem.quantity+=1
            cartItem.price=cartItem.quantity*cartItem.price
            res.status(200).json("Product updated successfully")

        }
        else{
            const cartNewProduct=new carts({id,title,price,image,quantity})
            await cartNewProduct.save()
            res.status(200).json("Product added successfully")

        }

    }
    catch(err){
        res.status(404).json(err)
    }
}
exports.getCart=async(req,res)=>{
    try{
        const allCartProducts=await carts.find()
        res.status(200).json(allCartProducts)


    }
    catch(err){
        res.status(404).json(err)

    }
}
exports.deleteFromCart=async(req,res)=>{
    const {id}=req.params
    try{
        const deleteItem=await carts.deleteOne({id})
        if(deleteItem){
            const cartProduct= await carts.find()
            res.status(200).json(cartProduct)
        }
    }
    catch(err){
        res.status(404).json(err)

    }
}
exports.incrementCart=async(req,res)=>{
    const {id}=req.params
    try{
        //check if product already exists
        const incrementCartProduct=await carts.findOne({id})
        //if product already exists then increment the product quantity by 1 and update the price accordingly
        if(incrementCartProduct){
            incrementCartProduct.quantity+=1
            incrementCartProduct.grandTotal=incrementCartProduct.price*incrementCartProduct.quantity
            //if its updated then it stored into the mongoDB
            await incrementCartProduct.save()
            //get all the product item details after updating
            const allCartProducts=await carts.find()
            res.status(200).json(allCartProducts)
        }
        else{
            res.status(402).json("Item not found")

        }

    }
    catch(err){
        res.status(404).json(err)

    }
}
exports.decrementCart=async(req,res)=>{
    const {id}=req.params
    try{
        //check if product already exists
        const decrementCartProduct=await carts.findOne({id})
        //if product already exists then increment the product quantity by 1 and update the price accordingly
        if(decrementCartProduct){
            decrementCartProduct.quantity-=1
            if(decrementCartProduct.quantity==0){
                const deleteItem=await carts.deleteOne({id})
                if(deleteItem){
                    const cartProduct= await carts.find()
                    res.status(200).json(cartProduct)
                }

            }
          else{
                decrementCartProduct.grandTotal=decrementCartProduct.price*decrementCartProduct.quantity
                //if its updated then it stored into the mongoDB
                await decrementCartProduct.save()
                //get all the product item details after updating
                 const allCartProducts=await carts.find()
                res.status(200).json(allCartProducts)
            }
            
        }
        else{
            res.status(402).json("Item not found")

        }

    }
    catch(err){
        res.status(404).json(err)

    }

}