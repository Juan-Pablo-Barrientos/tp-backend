const Sequelize = require('sequelize');
import { Op, where } from 'sequelize';
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
      attributes:{ 
         include: [[
        Sequelize.literal(`
      (SELECT COUNT(*) FROM poll_values join user_votes on poll_values.id = user_votes.pollValueId where poll_values.pollId= polls.id  ) 
      `), "totalVotes"
    ]]
  },     
      include: [ 
        {model:models.Categories},
        {
          model: models.PollValues, 
          attributes:{ 
            include: [[
              Sequelize.literal(`
            (SELECT COUNT(*) FROM user_votes WHERE user_votes.pollValueId = poll_values.id group by user_votes.pollValueId) 
            `), "votesByUsers"
          ],] 
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
            model: models.PollValues, attributes: ['id','description'],
          },
          {
            model: models.Categories
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
      const{categoryId,description,pollDate} = req.body;  
      if (!categoryId) {
        return res.status(400).json({ msg: "categoryId field is required.", error: true });
    }
      if (!description) {
          return res.status(400).json({ msg: "description field is required.", error: true });
      }      
      if (!pollDate) {
        return res.status(400).json({ msg: "pollDate field is required.", error: true });
    }
      const sameDatePoll = await models.Polls.findOne({where:{pollDate}});     
      if(sameDatePoll) {
      res.status(409).json({ msg: "Poll date already taken", error: true })}; 
      if(!sameDatePoll){
      const PollsInstance = await models.Polls.create(req.body,      
       {include: [ models.PollValues ]});      
      res.status(200).json({ data: PollsInstance, error: false });
    } 
  } catch (error) {
     return res.status(500).json({ msg: error, error: true });
  }

}
const updatePolls = async (req: any , res: any) => {
  try {
      const PollsID = req.params.id;
      const Polls = await models.Polls.findByPk(PollsID);
      const PollValues= req.body.poll_values;
      if (Polls) {
        await Polls.update(req.body);
        res.status(200).json({ data: Polls, error: false });
      }
      else {
          res.status(404).json({ msg: 'Polls not found', error: true });
      }
      if(PollValues){   
        PollValues.forEach(async (pollValueInstance: any) => {  
          if (pollValueInstance.description=="" && pollValueInstance.id!=null){
            const pollvalue = await models.PollValues.destroy({ where: { id: pollValueInstance.id } }); 
          }
          else{      
            const [pollvalue, created] = await models.PollValues.upsert({
              id: pollValueInstance.id,
              PollId:pollValueInstance.PollId,
              description: pollValueInstance.description,
            });
          }      
       }); 
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



