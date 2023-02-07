import * as models from '../../models/index';
const fetch = require('node-fetch')

const homeRender = async (req: any, res: any) => {
    const posts = await models.Posts.findAll({
        include:models.User
    })
    return res.render('../src/views/Body/index.ejs', {posts});
};

const weatherApiKey = async (req: any, res: any) => {
    try {
        const apikey = process.env.WEATHERAPIKEY;   
        const response = apikey;
        if (response != null) {
          return res.status(200).json({ data: response, error: false });
        }
        else {
          return res.status(404).json({ msg: `apikeyNotFound.`, error: true });
        }
      } catch (error) {
        return res.status(500).json({ msg: error, error: true });
      }
};

const getCurrentWeather = async (req: any, res: any) =>{
    const response = await fetch("https://api.weatherapi.com/v1/current.json?key="+process.env.WEATHERAPIKEY+"&q="+req.query.lat+","+req.query.lng+"&aqi=no");
    const data = await response.json();
    if (data != null) {
        return res.status(200).json({ data: data, error: false });
      }
      else {
        return res.status(404).json({ msg: `Posts not found.`, error: true });
      }
}


const getForecast = async (req: any, res: any) =>{
    console.log("https://api.weatherapi.com/v1/forecast.json?key="+process.env.WEATHERAPIKEY+"&q="+req.query.lat+","+req.query.lng+"&aqi=no&days=10")
    const response = await fetch("https://api.weatherapi.com/v1/forecast.json?key="+process.env.WEATHERAPIKEY+"&q="+req.query.lat+","+req.query.lng+"&aqi=no&days=10")
    const data = await response.json();
    if (data != null) {
        return res.status(200).json({ data: data, error: false });
      }
      else {
        return res.status(404).json({ msg: `Posts not found.`, error: true });
      }
  }



const create = async (req: any, res: any) => {
    const categories = await models.Categories.findAll();
    const authors = await models.User.findAll({where:{role:"Author"}});
    const provinces = await models.Provinces.findAll();
    return res.render('../src/views/body/create.ejs',{categories,authors,provinces});
};

const postsShow = async ( req: any, res: any) =>{
    const post = await models.Posts.findByPk(req.params.id,{
        include:[models.User,models.Categories,models.Provinces]
    });
    return res.render('../src/views/body/show.ejs',{post});
}

const postsEdit = async ( req: any, res: any) =>{
    const post = await models.Posts.findByPk(req.params.id,{
        include:[models.User,models.Categories,models.Provinces]
    });
    const provinces = await models.Provinces.findAll();
    const categories = await models.Categories.findAll();
    return res.render('../src/views/body/edit.ejs',{post,provinces,categories});
}

export {homeRender,create,postsShow,postsEdit,weatherApiKey,getForecast,getCurrentWeather }