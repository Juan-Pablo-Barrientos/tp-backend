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
  let conditions  = [{}];
  if(categoryId!=null){
    conditions.push({categoryId:categoryId});
    ;}
  if(autorId!=null){
    conditions.push({userId:autorId});
    ;}
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
      const name = req.body.name;
      const userId =req.body.userId;
      const categoryId = req.body.categoryId;
      const provinceId = req.body.provinceId;
      const title = req.body.title;
      const body=req.body.body;
      const requiresSubscription=req.body.requiresSubscription;
      
      if (!name) {
        return res.status(400).json({ msg: "name field is required.", error: true });
    }
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
      const PostsInstance = models.Posts.build(req.body);
      await PostsInstance.save();
      res.status(200).json({ data: PostsInstance, error: false });

  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }

}
const updatePosts = async (req: any , res: any) => {
  try {
      const PostsID = req.params.id;
      const Posts = await models.Posts.findByPk(PostsID);
      
      if (Posts) {
          res.status(200).json({ data: Posts, error: false });
          Posts.set(req.body);
          await Posts.save();
      }
      else {
          res.status(404).json({ msg: 'Posts not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
}

const deletePosts = async (req: any , res: any) => {
  try {
      const PostsID = req.params.id;
      const Posts = await models.Posts.findByPk(PostsID);
      if (Posts) {
          await Posts.destroy();
          res.status(200).json({ data: Posts, error: false, msg: "Post deleted successfully." });         
      } else {
          res.status(404).json({ msg: 'Post not found', error: true });
      }
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
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

