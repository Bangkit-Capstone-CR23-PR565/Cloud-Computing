import Users from "../models/model_user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

export const getUsers = async(req,res) => {
    try {
        const users = await Users.findAll({
            attributes:[
                'id',
                'email',
                'phone',
                'full_name',
                'location',
                'category_interest',
            ]
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req,res) => {
    const { email, phone, password, confPassword, full_name, location, category_interest } =  req.body;
    const emailAlreadyExist = await Users.findOne({
        where: {
            email: email
        }
    });
    const phoneAlreadyExist = await Users.findOne({
        where: {
            phone: phone
        }
    });
    function validatePhoneNumber(phoneNumber) {
      const cleanedNumber = phoneNumber.replace(/\D/g, "");
      if (!validator.isMobilePhone(cleanedNumber, "id-ID")) {
        return false;
      }
      return true;
    }

    try {
        if (validator.isEmail(req.body.email) === false) {
            throw { code: 400, message: "Email tidak valid." };
        }
        if (emailAlreadyExist) {
            throw { code: 400, message: "Email sudah terdaftar." };
        }
        if (!validatePhoneNumber(req.body.phone)) {
            throw { code: 400, message: "No. HP tidak valid." };
        }
        if (phoneAlreadyExist) {
            throw { code: 400, message: "No. HP sudah terdaftar." };
        }
        if (password !== confPassword) {
            return res.status(400).json({msg:"Password tidak cocok."});
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await Users.create({
            email: email,
            phone: phone,
            password: hashPassword,
            full_name: full_name,
            location: location,
            category_interest: category_interest
        });
        res.json({msg:"Register Berhasil"})
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req,res) =>{
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({msg:"Password salah."});
        const id = user[0].id;
        const email = user[0].email;
        const phone = user[0].phone;
        const full_name = user[0].full_name;
        const location = user[0].location;
        const category_interest = user[0].category_interest;
        const accessToken = jwt.sign({id, email, phone, full_name, location, category_interest}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        });
        const refreshToken = jwt.sign({id, email, phone, full_name, location, category_interest}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id: id
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24*60*60*1000,
            //secure: true
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg:"Email belum terdaftar."});
    }
}

export const Logout = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(204);
        const id=user[0].id;
        await Users.update({refresh_token:null},{
            where:{
                id: id
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}
