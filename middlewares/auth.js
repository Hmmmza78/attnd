const JWT = require("jsonwebtoken")

const authenticateToken = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const role = await JWT.decode(token, process.env.ACCESS_TOKEN_SECRET)
        if(!role){return res.json({message: "you need to be admin"})}
        next()
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Authorization Failed!"
        })
    }
}

module.exports = {authenticateToken}