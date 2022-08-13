import * as models from '../../models/index';
import * as postsController from '../postsControllers';

const homeRender = async (req: any, res: any) => {
    const posts = await models.Posts.findAll({
        include:models.User
    })
    return res.render('../src/views/Body/index.ejs', {posts});
};


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

export {homeRender,create,postsShow,postsEdit }