const User = require("../Model/UserModel");
const bcrpyt=require("bcrypt")
const saltrounds=10;
// exports.createUser = async(req,res)=>{
// console.log("Before",req.body.User);
// const respose = await User.create(req.body.User);
// console.log("After",req.body.User);
// try {
//     const newUser = new User({...req.body.User});
//     await newUser.save();
//     res.status(200).json({
//         status:"Success",
//         newUser
//     });
// } catch (error) {
//    console.log(error)
// }

// }
exports.createUser = async (req, res) => {
    const signUpData = req.body
    console.log(signUpData,"databody")
    const matched = await User.findOne({ Email: signUpData.Email })
    console.log(matched,"matched")
    if (matched) {
        console.log(matched,true)
      return  res.send({ message: "Email Already Exists" })
    }
    else {
        const hashedpass = bcrpyt.hashSync(signUpData.Pass, saltrounds)
        const newObj = {
            Email: signUpData.Email,
            Name: signUpData.Name,
            Pass: hashedpass
        }
        await User.create(newObj)
        return res.send({ message: "User Registered" })
    }
}
