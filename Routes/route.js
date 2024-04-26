const express=require('express');
const cartController=require('../Controllers/cartController')
const productController=require('../Controllers/productController');
const userController=require('../Controllers/userController');
const wishlistController=require('../Controllers/wishlistController')
const jwtMiddileware=require('../Middilewares/jwtMiddileware')
const router=new express.Router()

//get all-products
router.get('/all-products',productController.getAllProducts)

//register
router.post('/user/register',userController.register)
//login
router.post('/user/login',userController.login)
//get a-product

router.get('/view-product/:id',productController.getProduct)

router.post('/wishlist',jwtMiddileware,wishlistController.addWishlist)

router.get('/get-wishlist',jwtMiddileware,wishlistController.getWishlist)

router.delete('/delete-wishlist/:id',jwtMiddileware,wishlistController.deleteFromWishlist)

router.post('/add-cart',jwtMiddileware,cartController.addToCart)

router.get('/get-cart',jwtMiddileware,cartController.getCart)

router.delete('/delete-cart/:id',jwtMiddileware,cartController.deleteFromCart)

router.get('/increment-cart/:id',jwtMiddileware,cartController.incrementCart)

router.get('/decrement-cart/:id',jwtMiddileware,cartController.decrementCart)



module.exports=router