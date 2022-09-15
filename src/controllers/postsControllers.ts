// eslint-disable-next-line import/extensions
import { request } from 'express';
import { IntegerDataType } from 'sequelize/types';
import { Op } from 'sequelize'
const Sequelize = require('sequelize')
import * as models from '../models/index';
var cloudinary = require('cloudinary').v2;


// eslint-disable-next-line consistent-return
const getPostsById = async (req: any, res: any) => {
  try {
    const PostsID = req.params.id;   
    const response = await models.Posts.findByPk(PostsID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `Posts not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};

const getAllPosts = async (req:any, res:any) => { 
  const autorId = req.query.autorId;
  const categoryId= req.query.categoryId;
  const keyWord = req.query.title;
  const { Op } = require("sequelize");
  let conditions  = [{}];
  if(categoryId!=null){
    conditions.push({categoryId:categoryId});
    }
  if(autorId!=null){
    conditions.push({userId:autorId});
    }
  if(keyWord!=null || keyWord==""){
    conditions.push({title: {[Op.substring]:keyWord}})
  }
  try {
      const response = await models.Posts.findAll({
        where:conditions
      });
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};
//TODO JOIN addPosts, addPostsCore y addPostsRepository
const addPosts= async (req:any, res:any, next:any) => {
  let post = req.body;
  let img = req.files['myImage'][0];
  try {
    let postCreated = await addPostsCore(post, img);
    return res.status(201).send(postCreated);
  } catch (error) {
    return next(error);
  }
}
const addPostsCore= async (post:any, img:any,) => {
  if(img){
    const options = {
      use_filename: false,
      unique_filename: false,
      overwrite: true,
    };
    try {
      const result = await cloudinary.uploader.upload(img.path, options);
      post.path_img = ("https://res.cloudinary.com/clawgames/image/upload/"+result.public_id)
    } catch (error) {
    }
  }
  const postCreated = await addPostsRepository(post);
  return postCreated;
}
const addPostsRepository= async (post:any) => {
    post.clicks=0
    post.postDate=Sequelize.cast(new Date(), "datetime")
    const postCreated = await models.Posts.create(post);
    return postCreated;
}
//

const updatePosts = async (req: any , res: any) => {
  try {
      const PostsID = req.params.id;
      const Posts = await models.Posts.findByPk(PostsID);
      
      if (Posts) {
          res.status(200).json({ data: Posts,'status':200, error: false });
          Posts.set({
            categoryId:req.body.category,
            provinceId:req.body.province,
            title:req.body.title,
            body:req.body.body,
            requiresSubscription:req.body.sub
          });
          await Posts.save();
      }
      else {
          res.status(404).json({ msg: 'Posts not found','status':404, error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error,'status':500, error: true });
  }
}

const deletePosts = async (req: any , res: any) => {
  try {
      const PostsID = req.params.id;
      const Posts = await models.Posts.findByPk(PostsID);
      if (Posts) {
          await Posts.destroy();
          res.status(200).json({ data: Posts, error: false,'status':200, msg: "Post deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'Post not found','status':404, error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error,'status':500, error: true });
  }
}
// eslint-disable-next-line import/prefer-default-export


const getPostsByIdWithAuthor = async (req: any, res: any) => {
  try {
    const PostsID = req.params.id;   
    let response:any = await models.Posts.findByPk(PostsID,{
      include: [{
        model:models.User,
        attributes: ['name','surname']
      }],
    });
    if(response){
      response.clicks+=1
      response.save()
    }
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    // eslint-disable-next-line brace-style
    }
    // eslint-disable-next-line no-else-return
    else {
      return res.status(404).json({ msg: `Posts not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};


const getMostClickedPosts = async (req:any, res:any) => { 
  try {
    const numWeeks = 1;
    const now = new Date();
    const minusWeek= new Date( Date.now() - (6.048e+8 * numWeeks) );
    
      const response = await models.Posts.findAll({
        where: {[Op.and] :{
          postDate: {
            [Op.gt]: Sequelize.cast(minusWeek, "datetime"),
            [Op.lt]: Sequelize.cast(now, "datetime")
          }
        }}
      })
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

export { getPostsById, addPosts , getAllPosts , updatePosts , deletePosts,getPostsByIdWithAuthor, getMostClickedPosts};

