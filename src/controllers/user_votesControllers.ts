// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getUserVotesById = async (req: any, res: any) => {
  try {
    const userVotesID = req.params.id;   
    const response = await models.User.findByPk(userVotesID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `UserVote not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllUserVotes = async (req:any, res:any) => {
  try {
      const response = await models.User.findAll();
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

const addUserVotes = async (req: any , res: any) => {
  try {
      const pollId = req.body.pollId;
      const pollValueId =req.body.pollValueId;

      if (!pollId) {
        return res.status(400).json({ msg: "pollId field is required.", error: true });
    }
      if (!pollValueId) {
          return res.status(400).json({ msg: "pollValueId field is required.", error: true });
      }      
      const userVoteInstance = models.User.build(req.body);
      await userVoteInstance.save();
      res.status(200).json({ data: userVoteInstance, error: false });

    }catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updateUserVotes = async (req: any , res: any) => {
  try {
      const userVotesID = req.params.id;
      const userVotes = await models.User.findByPk(userVotesID);
      
      if (userVotes) {
          res.status(200).json({ data: userVotes, error: false });
          userVotes.set(req.body);
          await userVotes.save();
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
      const userVotes = await models.User.findByPk(userVotesID);
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
// eslint-disable-next-line import/prefer-default-export

export { getUserVotesById, addUserVotes , getAllUserVotes , updateUserVotes , deleteUserVotes};

