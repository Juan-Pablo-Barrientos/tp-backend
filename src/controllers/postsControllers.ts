// eslint-disable-next-line import/extensions
import { request } from 'express';
import { IntegerDataType } from 'sequelize/types';
import * as models from '../models/index';


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
  if(keyWord!=null){
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

const addPosts = async (req: any , res: any) => {
  try {
      const userId =  req.body.author
      const categoryId =  req.body.category
      const provinceId =  req.body.province
      const title =  req.body.title;
      const body=  req.body.body;
      const requiresSubscription=  req.body.sub;
      
      if (!userId) {
          return res.status(400).json({ msg: "userId field is required.", error: true });
      }
      if (!categoryId) {
          return res.status(400).json({ msg: "categoryId field is required.", error: true });
      }
      if (!provinceId) {
          return res.status(400).json({ msg: "provinceId field is required.", error: true });
      }
      if (!title) {
          return res.status(400).json({ msg: "title field is required.", error: true });
      }  
      if (!body) {
        return res.status(400).json({ msg: "body field is required.", error: true });
    }
    if (!requiresSubscription) {
        return res.status(400).json({ msg: "requiresSubscription field is required.", error: true });
    }

      const PostsInstance = models.Posts.build({
        userId:userId,
        categoryId:categoryId,
        provinceId:provinceId,
        title:title,
        body:body,
        requiresSubscription:requiresSubscription
  
      });
      await PostsInstance.save();
      res.status(200).json({ data: PostsInstance, 'status':200 , error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, 'status':500 , error: true });
  }

}
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
    const response = await models.Posts.findByPk(PostsID,{
      attributes: ['title','body'],
      include: [{
        model:models.User,
        attributes: ['name','surname']
      }],
    });
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

export { getPostsById, addPosts , getAllPosts , updatePosts , deletePosts,getPostsByIdWithAuthor};

