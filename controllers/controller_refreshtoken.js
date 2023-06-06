import UserModel from "../models/model_user.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await UserModel.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err, decoded)=>{
            if (err) return res.sendStatus(403);
            const userID = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken =  jwt.sign({userID,name, email},process.env.ACCESS_TOKEN_SECRET,{
                expiresIn:'1d'
            });
            res.json({accessToken});
        })
    } catch (error) {
        console.log(error);
    }
}