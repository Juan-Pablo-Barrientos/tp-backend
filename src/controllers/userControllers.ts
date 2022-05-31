// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getUserById = async (req: any, res: any) => {
  try {
    const userID = req.body.id;
    const response = await models.User.findByPk(userID);
    if (models.User === null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `User ${req.body.id} not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const addUser = async (req: any , res: any) => {
  try {
      const name = req.body.name;
      const surname = req.body.email;
      const username = req.body.contraseña;
      const role = req.body.permisos;
      const phoneNumber = req.body.permisos;
      
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
      const userInstance = models.User.build({ name:  name , surname: surname, username: username, role: role, phoneNumber: phoneNumber});
      await userInstance.save();
      res.status(200).json({ data: userInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
// eslint-disable-next-line import/prefer-default-export
export { getUserById, addUser };
