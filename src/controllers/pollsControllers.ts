const Sequelize = require('sequelize');
import { Op } from 'sequelize';
import * as models from '../models/index';

const getPollsById = async (req: any, res: any) => {
  try {
    const PollsID = req.params.id;   
    const response = await models.Polls.findByPk(PollsID,{
      include: { all: true },
    }); 
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `Polls not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getTodaysPoll = async (req: any, res: any) => {
  try {
    const TODAY = new Date();
    const response = await models.Polls.findOne({ 
      include: [
        {
          model: models.PollValues, 
          attributes:{ 
            include: [[
              Sequelize.literal(`
            (SELECT COUNT(*) FROM user_votes WHERE user_votes.pollValueId = poll_values.id group by user_votes.pollValueId) 
            `), "votesByUsers"
          ]] 
        }          
        }   
      ],     
      where: {   
      pollDate: TODAY  
    }, 
    });
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
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
        include: [
          {
            model: models.PollValues  , attributes: ['id','description']  
          }],
        where: conditions
      },
      );
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

const addPolls = async (req: any , res: any) => {
  try {
      const{categoryId,description,pollDate,pollValueArray} = req.body;      
      let pollValuesInstances  = [{}];
      delete pollValuesInstances[0];
      if(pollValueArray!=null || pollValueArray==""){
        pollValueArray.forEach((element: any) => {
          pollValuesInstances.push({description:element})
        });    
      } 
      if (!categoryId) {
        return res.status(400).json({ msg: "categoryId field is required.", error: true });
    }
      if (!description) {
          return res.status(400).json({ msg: "description field is required.", error: true });
      }      
      if (!pollDate) {
        return res.status(400).json({ msg: "pollDate field is required.", error: true });
    }
      const PollsInstance = await models.Polls.create({
        categoryId: categoryId,
        description: description,
        pollDate: pollDate,
        poll_values: pollValuesInstances
      }, {
        include: [ models.PollValues ]
      });
      res.status(200).json({ data: PollsInstance, error: false });
  } catch (error:any) {
    if(error.name=="SequelizeUniqueConstraintError"){
      res.status(409).json({ msg: "Poll date already taken", error: true });
    }
      return res.status(500).json({ msg: error, error: true });
  }

}
const updatePolls = async (req: any , res: any) => {
  try {
      const PollsID = req.params.id;
      const Polls = await models.Polls.findByPk(PollsID);
      
      if (Polls) {
        Polls.set(req.body);
        await Polls.save();
        res.status(200).json({ data: Polls, error: false });
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

export { getPollsById, addPolls , getAllPolls , updatePolls , deletePolls,getTodaysPoll};



