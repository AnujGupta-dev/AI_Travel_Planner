import jwt from "jsonwebtoken"

export const auth = (req,res,next)=>{
    try{
            const token =  req.body.token ;

            if(!token ){
                res.status(401).json({
                    message:"Login failed",
                    sucess:false,
                    error:"Token missing"
                })
            }
            try{
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decode
                next();              
            } 
            catch(err){
                return res.status(402).json({
                    success: false,
                    message: "Login expired " + err.message
                })
            }
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

