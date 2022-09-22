import * as models from '../models/index';

const getPriceByDate = async (req: any, res: any) => {
  try {  
    const response = await models.SubscriptionPrices.findOne({ where: { effectiveDate: req.params} });
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `Price not found.`, error: true });
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
        const userInstance = models.SubscriptionPrices.build(req.body);
        await userInstance.save();
        res.status(200).json({ data: userInstance, error: false });
  
    } catch (error) {
        return res.status(500).json({ msg: error, error: true });
    }
  
  };

const getAllPrice = async (req:any, res:any) => {
  try {
      const response = await models.SubscriptionPrices.findAll();
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deletePrice = async (req: any , res: any) => {
  try {
      const priceID = req.params.id;
      const price = await models.SubscriptionPrices.findByPk(priceID);
      if (price) {
          await price.destroy();
          res.status(200).json({ data: price, error: false, msg: "Price deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'Price not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}
export { getPriceByDate , deletePrice, addPrice, getAllPrice };