// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getUserById = async (req: any, res: any) => {
  try {
    const userID = req.body.id;
    console.log(userID);
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

const addUser = async (req: any , res: any) => {
  try {
      const name = "jane";
      const surname ="Doe";
      const username = "wacho";
      const role = "wacho";
      const phoneNumber = "123";
      const subscribedUntil="2025-12-12"
      
      if (!name) {
        return res.status(400).json({ msg: "name field is required.", error: true });
    }
      if (!surname) {
          return res.status(400).json({ msg: "surname field is required.", error: true });
      }
      if (!username) {
          return res.status(400).json({ msg: "username field is required.", error: true });
      }
      if (!role) {
          return res.status(400).json({ msg: "role field is required.", error: true });
      }
      if (!phoneNumber) {
          return res.status(400).json({ msg: "phoneNumber field is required.", error: true });
      }  
      const userInstance = models.User.build({
       name:  name ,
       surname: surname, 
       username: username, 
       role: role, 
       phoneNumber: phoneNumber,
       subscribedUntil:subscribedUntil
      });
      await userInstance.save();
      res.status(200).json({ data: userInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
// eslint-disable-next-line import/prefer-default-export

export { getUserById, addUser , getAllUser };

