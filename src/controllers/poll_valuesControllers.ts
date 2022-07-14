// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getPollValuesById = async (req: any, res: any) => {
  try {
    const pollValuesID = req.params.id;   
    const response = await models.PollValues.findByPk(pollValuesID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `poll value not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};
const addPollValues = async (req: any , res: any) => {
    try {
        const pollId = req.body.pollId;
        const description =req.body.description;
        if (!pollId) {
            return res.status(400).json({ msg: "pollId field is required.", error: true });
        }
        if (!description) {
            return res.status(400).json({ msg: "description field is required.", error: true });
        }  
        const pollValueInstance = models.PollValues.build(req.body);
        await pollValueInstance.save();
        res.status(200).json({ data: pollValueInstance, error: false });
  
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
  
  }
  export {addPollValues, getPollValuesById}