// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getUserById = async (req: any, res: any) => {
  try {
    const userID = req.params.id;   
    const response = await models.User.findByPk(userID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
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
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(200).json({ msg: `User not found.`, error: false, exist: false });
      }
   }  catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }

}

const addUser = async (req: any , res: any) => {
  try {
      const name = req.body.name;
      const surname =req.body.surname;
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const role = req.body.role;
      const phoneNumber = req.body.phoneNumber;
      const subscribedUntil=req.body.subscribedUntil;
          
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

      if (req.body.subscribedUntil) {
        req.body.subscribedUntil = new Date();
        req.body.subscribedUntil.setMonth(req.body.subscribedUntil.getMonth() + 1);
      }
      else {
        delete req.body['subscribedUntil'];
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
      
      if (user) {
          res.status(200).json({ data: user, error: false });
          user.set(req.body);
          await user.save();
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
// eslint-disable-next-line import/prefer-default-export


// eslint-disable-next-line consistent-return
const getUserByIdWithPosts = async (req: any, res: any) => {
  try {
    const userID = req.params.id;   
    const response = await models.User.findByPk(userID,{
      attributes:['name','surname','bio'],
      include:[{
        model:models.Posts,
        attributes:['title','body','requiresSubscription']
    }]
    });
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `User not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

export { getUserById, addUser , getAllUser , updateUser , deleteUser, getUserByIdWithPosts,userExist};

