import Users from "../models/model_user.js";

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
      res.status(500).json({msg:"Server error."});
  }
}

export const getUserById = async(req,res) => {
  const id = req.params.id;
  try {
      const user = await Users.findByPk(id, {
          attributes:[
              'id',
              'email',
              'phone',
              'full_name',
              'location',
              'category_interest',
          ]
      });
      if (!user) {
          res.status(404).json({msg:"User not found."});
      } else {
          res.json(user);
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({msg:"Server error."});
  }
}