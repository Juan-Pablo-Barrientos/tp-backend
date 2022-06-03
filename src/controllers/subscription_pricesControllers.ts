// eslint-disable-next-line import/extensions
import * as models from '../models/index';

// eslint-disable-next-line consistent-return
const getPriceByDate = async (req: any, res: any) => {
  try {  
    const response = await models.User.findOne({ where: { effectiveDate: req.params} });
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

const addPrice = async (req: any , res: any) => {
    try {
        const SubscriptionPrices = req.body.SubscriptionPrices;
        const price =req.body.price;
        if (!SubscriptionPrices) {
            return res.status(400).json({ msg: "SubscriptionPrices field is required.", error: true });
        }
        if (!price) {
            return res.status(400).json({ msg: "price field is required.", error: true });
        }  
        const userInstance = models.User.build(req.body);
        await userInstance.save();
        res.status(200).json({ data: userInstance, error: false });
  
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
  
  }
export { getPriceByDate , addPrice };