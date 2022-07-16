// eslint-disable-next-line import/extensions
import { Model } from 'sequelize/types';
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getPollsById = async (req: any, res: any) => {
  try {
    const PollsID = req.params.id;   
    const response = await models.Polls.findByPk(PollsID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `Polls not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllPolls = async (req:any, res:any) => {
 const categoryId = req.query.categoryId;
 let conditions =[{}];
 if (categoryId!=null){
  conditions.push({categoryId:categoryId});
 }
  try {
      const response = await models.Polls.findAll({
        where: conditions
      });
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

const addPolls = async (req: any , res: any) => {
  try {
      const categotyId = req.body.categotyId;
      const description =req.body.description;   
      if (!categotyId) {
        return res.status(400).json({ msg: "categotyId field is required.", error: true });
    }
      if (!description) {
          return res.status(400).json({ msg: "description field is required.", error: true });
      }  
      const PollsInstance = models.Polls.build(req.body);
      await PollsInstance.save();
      res.status(200).json({ data: PollsInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updatePolls = async (req: any , res: any) => {
  try {
      const PollsID = req.params.id;
      const Polls = await models.Polls.findByPk(PollsID);
      
      if (Polls) {
          res.status(200).json({ data: Polls, error: false });
          Polls.set(req.body);
          await Polls.save();
      }
      else {
          res.status(404).json({ msg: 'Polls not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deletePolls = async (req: any , res: any) => {
  try {
      const PollsID = req.params.id;
      const Polls = await models.Polls.findByPk(PollsID);
      if (Polls) {
          await Polls.destroy();
          res.status(200).json({ data: Polls, error: false, msg: "Polls deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'Polls not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}
// eslint-disable-next-line import/prefer-default-export

export { getPollsById, addPolls , getAllPolls , updatePolls , deletePolls};

