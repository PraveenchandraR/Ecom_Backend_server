const AuthRouter  = require("express").Router();
const SignUpController = require("../controller/SignUpController");
const SignInController = require("../controller/SignInController");


AuthRouter.route("/signUp").post(SignUpController.createUser);    
// AuthRouter.route("/signIn").post(SignInController.SignIn);
AuthRouter.post("/signIn",SignInController.SignIn);    

// AuthRouter.route("/verify").post(SignInController.verify);




module.exports = AuthRouter;