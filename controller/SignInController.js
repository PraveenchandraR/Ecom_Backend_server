const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.SignIn = async (req, res) => {
  const plainPass = req.body.Pass;

  try {
        console.log(req.body.Email);
        const doseExist = await User.findOne({ Email: req.body.Email });
        console.log(doseExist);
        if (doseExist) {
            const check = await bcrypt.compare(plainPass,doseExist.Pass);
            if (check) {
                jwt.sign({doseExist},process.env.SECRET_KEY,(err,tokens)=>{
                    if(err){
                        throw new Error(err);
                    }else{
                        res.status(200).json({
                            status:"Success",
                            UserID:doseExist._id,
                            UserName:doseExist.Name,
                            tokens
                        });
                    }
                })
            }else{
                res.status(400).json({
                    status:"fail",
                    message:"userName or Pass is incorrect"
                });
            }
        }else{
            res.status(400).json({
                status:"fail",
                message:"userName or Pass is incorrect"
            });
        }
  } catch (error) {
    console.log(error);
    res.status(400).json({
        status:"fail",
        error
    });
  }
};




exports.verify = (req,res)=>{
    const tokens = req.headers['authorization'];
    console.log(tokens,"tokenverify"); 
    // const userID = decodedTokens.userID;
    // console.log(userID);
    if(tokens){
        const token=tokens.split(" ")[1]

        jwt.verify(token,process.env.SECRET_KEY,(err,decodedTokens)=>{
            if(err){
                console.log(err);
                res.status(400).json({
                    status:false,
                    UserID:undefined,
                    UserName:undefined
                });
            }else{
                console.log(decodedTokens);
                res.status(200).json({
                    status:true,
                    UserID:decodedTokens.doseExist._id,
                    UserName:decodedTokens.doseExist.Name
                });
            }
        });
    }else{
        // res.end(tokens);
        res.status(400).json({
            status:false,
            UserID:undefined,
            UserName:undefined
        });
    }

}