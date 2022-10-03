import * as models from '../models/index';
const { Op } = require("sequelize");

const getUserVotesById = async (req: any, res: any) => {
  try {
    const{userId,pollId} = req.body;       
    const response = await models.UserVotes.findOne({
       where:{
       [Op.and]: [
        { userId: userId }, 
        { pollId: pollId } 
       ]}
      });
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `UserVote not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllUserVotes = async (req:any, res:any) => {
  try {
      const response = await models.UserVotes.findAll();
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

const addUserVotes = async (req: any , res: any) => {
  try {
      const {userId,pollId,pollValueId} = req.body;
      if (!userId) {
        return res.status(400).json({ msg: "userId field is required.", error: true });
    }
      if (!pollId) {
        return res.status(400).json({ msg: "pollId field is required.", error: true });
    }
      if (!pollValueId) {
          return res.status(400).json({ msg: "pollValueId field is required.", error: true });
      }
      const response = await models.UserVotes.findOne({ where: {pollId,userId} });
      if(!response){
      const userVoteInstance = models.UserVotes.build(req.body);
      await userVoteInstance.save();
      res.status(200).json({ data: userVoteInstance, error: false });
      }
      else{
        await response.update({ pollValueId: pollValueId });
        res.status(200).json({ data: response, error: false });
      }
    }catch (error) { 
      return res.status(500).json({ msg: error, error: true });
  }

}
const updateUserVotes = async (req: any , res: any) => {
  try {
      
      const userVotesID = req.params.id;
      const userVotes = await models.UserVotes.findByPk(userVotesID);
      
      if (userVotes) {
        userVotes.set(req.body);
        await userVotes.save();
        res.status(200).json({ data: userVotes, error: false });
      }
      else {
          res.status(404).json({ msg: 'User not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deleteUserVotes = async (req: any , res: any) => {
  try {
      const userVotesID = req.params.id;
      const userVotes = await models.UserVotes.findByPk(userVotesID);
      if (userVotes) {
          await userVotes.destroy();
          res.status(200).json({ data: userVotes, error: false, msg: "User vote deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'User vote not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

export { getUserVotesById, addUserVotes , getAllUserVotes , updateUserVotes , deleteUserVotes};

