const Cart = require("../Model/Cart");
const CartModel = require("../Model/Cart");
const UsersModel = require("../Model/UserModel");
const AllProduct = require("./../Model/HomeModel");

exports.AddToCart = async (req, res) => {
  console.log("Add Items req.BOdy.Data", req.body.Data);
  const { userID, productID, quantity } = req.body.Data;

  try {
    const user = await UsersModel.findById(userID);
    console.log("user =>", user);
    let cart = await CartModel.findOne({ userId: user._id });
    let product = await AllProduct.findById(productID);
    console.log("cart =>", cart);
    if (cart) {
      let itemIndex = cart.products.findIndex((ele) => {
        if (ele) {
          return ele._id == productID;
        } else return false;
      });
      console.log("itemIndex==>", itemIndex);
      if (itemIndex > -1) {
        let productQuantity = cart.products[itemIndex];
        productQuantity.quantity = quantity;
        if (quantity === 0) {
          cart.products.splice(itemIndex, 1); // Remove the item from the cart if quantity is 0
        } else {
          cart.products[itemIndex] = productQuantity;
        }
      } else if (quantity !== 0) { // Add the product to the cart only if quantity is not 0
        cart.products.push(product);
      }
      cart = await cart.save();
      res.status(200).json({
        status: "success",
        cart: cart,
      });
    } else {
      console.log("user._id==>", user._id);
      console.log("{productID,quantity,price}==>", { productID, quantity });
      // const nCart = await CartModel.create({
      //     userId:user._id,
      //     products:[{productID,quantity,price}]
      // });
      const nCart = await new CartModel({
        userId: user._id,
        products: [{ ...product, quantity: quantity }],
      });

      const response = await nCart.save();
      return res.status(201).json({ response });
    }
  } catch (error) {
    // console.log("error in add Items",error);
    // res.status(400).json({
    //     status:"Fail",
    //     error:error
    // });
  }
};

exports.showCart = async (req, res) => {
  const cartItems = [];
  const { userID } = req.body.Data;
  console.log("Show carts req.body.Data =>", req.body.Data);
  try {
    const user = await UsersModel.findById(userID);
    console.log("Show cart user =>", user);
    let cart = await CartModel.findOne({ userId: user._id });
    console.log("show cart's cart =>", cart);
    if (cart == null) {
      return res.send({ message: "BUY NOW" });
    }
    cart.products = cart.products.filter((product) => product && product.quantity > 0); // Filter out items with quantity 0
    // cart.products.map((product) => {
    //   if (product !== null) {
    //     cartItems.push(product);
    //   }
    // });

    res.status(200).json({
      cartItems,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      error: error,
    });
  }
};

exports.checkout = async (req, res) => {
  try {
    const data  = req.body;
    // console.log(data.UserID);
    const finddata=await Cart.findOne({userId:data.UserID})
    console.log(finddata,"finddata")
   const deletedata= await finddata.deleteOne()
    return res.send({
        message:"order success",
        data:deletedata
    })

  } catch (error) {
    res.json({
      status: "fail",
      error: error,
    });
  }
};
