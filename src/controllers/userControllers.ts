import * as models from '../models/index';
const jwt = require("jsonwebtoken");
var cloudinary = require('cloudinary').v2;

const getUserById = async (req: any, res: any) => {
  try {
    const userID = req.params.id;   
    const response = await models.User.findByPk(userID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `User not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const changePassword = async (req: any, res: any) => {
  try {
    const {userId,newPassword,oldPassword} = req.body;   
  if (!newPassword) {
      return res.status(400).json({ msg: "new password field is required.", error: true });
  }
  if (!oldPassword) {
    return res.status(400).json({ msg: "old password field is required.", error: true });
}
  if (!userId) {
  return res.status(400).json({ msg: "userId field is required.", error: true });
}
    const response:any = await models.User.findByPk(userId);
    if (response != null) {
      if(response.password==oldPassword){
        response.update({ password: newPassword });
        return res.status(200).json({ data: response, error: false });
      }
      else{
        return res.status(404).json({ msg: `Wrong password.`, error: true });
      }
    }
    else {
      return res.status(404).json({ msg: `User not found.`, error: true });
    }

  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllUser = async (req:any, res:any) => {
  try {
      const response = await models.User.findAll();
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};
const userExist = async (req:any , res:any) => {
  try {
    const username = req.params.username;
    const response = await models.User.findOne({ where: {username} });
    if (response != null) {
      return res.status(200).json({ msg: `User exist.`, error: false, exist: true });      
    }
    else {
      return res.status(200).json({ msg: `User not found.`, error: false, exist: false });
      }
   }  catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }

}
const emailExist = async (req:any , res:any) => {
  try {
    const email = req.params.email;
    const response = await models.User.findOne({ where: {email} });
    if (response != null) {
      return res.status(200).json({ msg: `Email exist.`, error: false, exist: true });      
    }
    else {
      return res.status(200).json({ msg: `Email not found.`, error: false, exist: false });
      }
   }  catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }

}

const addUser = async (req: any , res: any) => {
  try {
    const{name,surname,username,password,role,email,phoneNumber} = req.body;
    
      if (!name) {
        return res.status(400).json({ msg: "name field is required.", error: true });
      }
      if (!surname) {
          return res.status(400).json({ msg: "surname field is required.", error: true });
      }
      if (!username) {
          return res.status(400).json({ msg: "username field is required.", error: true });
      }
      if (!password) {
          return res.status(400).json({ msg: "password field is required.", error: true });
      }
      if (!email) {
        return res.status(400).json({ msg: "email field is required.", error: true });
      }
      if (!role) {
          return res.status(400).json({ msg: "role field is required.", error: true });
      }
      if (!phoneNumber) {
          return res.status(400).json({ msg: "phoneNumber field is required.", error: true });
      }
      const alreadyExistingUser = await models.User.findOne({ where: {username} });
      
      if (alreadyExistingUser === null){
      const userInstance = models.User.build(req.body);
      await userInstance.save();
      res.status(200).json({ data: userInstance, error: false });
      }
      else{
        res.status(409).json({ msg: `User already exist.`, error: true});
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updateUser = async (req: any , res: any) => {
  try {
      const userID = req.params.id;
      const user = await models.User.findByPk(userID);
      let img;
      if(req.files['myImage']!==undefined){
        img = req.files['myImage'][0];
        }
    if(img){
      const options = {use_filename: false, unique_filename: false, overwrite: true,};
        const result = await cloudinary.uploader.upload(img.path, options);
        req.body.path_img = ("https://res.cloudinary.com/clawgames/image/upload/w_1000,ar_16:9,c_fill/"+result.public_id)
      }
      if (user) {
        user.set(req.body);
        await user.save();
        res.status(200).json({ data: user, error: false });
      }
      else {
          res.status(404).json({ msg: 'User not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deleteUser = async (req: any , res: any) => {
  try {
      const userID = req.params.id;
      const user = await models.User.findByPk(userID);
      if (user) {
          await user.destroy();
          res.status(200).json({ data: user, error: false, msg: "User deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'User not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}


const getUserByIdWithPosts = async (req: any, res: any) => {
  try {
    const userID = req.params.id;   
    const response = await models.User.findByPk(userID,{
      include:[{
        model: models.Posts, 
        include:[{model:models.Categories,paranoid:false}]
        }]
    });
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `User not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const login= async (req:any, res:any, next:any) => {
  const body = req.body;
  try {
    const user = await loginCore(body);
    if (user) return res.status(200).send({ data: user });
    else return res.status(404).send(`The user or password is not correct`);
  } catch (error) {
    return next(error);
  }
}

  const loginCore= async (usernPass:any) => {
    const userLogin = await loginRepository(usernPass);
    if (userLogin){
      const userToJson = userLogin.toJSON();
      if (userToJson) {
        let PassMatch= false
        if (usernPass.password===userToJson.password) {
          PassMatch=true
        }
        if (PassMatch) {
          userToJson.jwt = jwt.sign({ id_user: userToJson.id, role: userToJson.role }, process.env.AUTH_SECRET, {
            expiresIn: process.env.AUTH_EXPIRES,
          });
          delete userToJson.password;
          return userToJson;
        }
      }
    }
  }

  const loginRepository= async (usernPass:any) => {
    const { username } = usernPass;
    const getUsr = await models.User.findOne({
      where: {
        username: username,
      },
      attributes: [
        "id",
        "name",
        "surname",
        "role",
        "phoneNumber",
        "subscribed",
        "Bio",
        "password",
        "email",
      ],
    });
    return getUsr;
  }


export { getUserById, addUser , getAllUser , updateUser , deleteUser, getUserByIdWithPosts, userExist, login, emailExist,changePassword};

