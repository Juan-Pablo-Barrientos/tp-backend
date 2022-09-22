// eslint-disable-next-line import/extensions
import * as models from "../models/index";

// eslint-disable-next-line consistent-return
const getPollValuesById = async (req: any, res: any) => {
  try {
    const pollValuesID = req.params.id;   
    const response = await models.Categories.findByPk(pollValuesID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `PollValue not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllPollValues = async (req:any, res:any) => {
  try {
      const response = await models.PollValues.findAll();
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

const addPollValues = async (req: any , res: any) => {
  try {
      const pollId = req.body.pollId;
      const description = req.body.description;
      
      if (!pollId) {
        return res.status(400).json({ msg: "pollId field is required.", error: true });
    } 
      
      if (!description) {
       return res.status(400).json({ msg: "description field is required.", error: true });
    } 
      const pollValuesInstance = models.PollValues.build(req.body);
      await pollValuesInstance.save();
      res.status(200).json({ data: pollValuesInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updatePollValues = async (req: any , res: any) => {
  try {
      const pollValuesID = req.params.id;
      const pollValue = await models.PollValues.findByPk(pollValuesID);
      
      if (pollValue) {
        pollValue.set(req.body);
        await pollValue.save();
        res.status(200).json({ data: pollValue, error: false });
      }
      else {
          res.status(404).json({ msg: 'PollValue not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deletePollValues = async (req: any , res: any) => {
  try {
      const pollValuesID = req.params.id;
      const pollValue = await models.PollValues.findByPk(pollValuesID);
      if (pollValue) {
          await pollValue.destroy();
          res.status(200).json({ data: pollValue, error: false, msg: "PollValue deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'PollValue not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}
  export {updatePollValues, deletePollValues, addPollValues, getPollValuesById, getAllPollValues}