import { request } from 'express';
import { IntegerDataType } from 'sequelize/types';
import { Op } from 'sequelize'
const Sequelize = require('sequelize')
import * as models from '../models/index';
var cloudinary = require('cloudinary').v2;
const nodemailer = require('nodemailer');
require('dotenv').config({path:`.env.${process.env.ENV}`});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
});


const getPostsById = async (req: any, res: any) => {
  try {
    const PostsID = req.params.id;   
    const response = await models.Posts.findByPk(PostsID);
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
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
  const provinceId=req.query.provinceId

  let conditions  = [{}];
  if(categoryId!=null){
    conditions.push({categoryId:categoryId});
    }
  if(provinceId!=null){
    conditions.push({provinceId:provinceId});
    }
  if(autorId!=null){
    conditions.push({userId:autorId});
    }
  if(keyWord!=null || keyWord==""){
    conditions.push({title: {[Op.substring]:keyWord}})
  }
  try {
      const response = await models.Posts.findAll({
        where:conditions,
        include: { all: true, nested: true, paranoid: false },
      });
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

const addPosts= async (req:any, res:any, next:any) => {
  let post = req.body;
  post.clicks=0;
  post.postDate=Sequelize.cast(new Date(), "datetime");
  let img = req.files['myImage'][0];
  let postCreated:any=null
  try {
    if(img){
      const options = {use_filename: false, unique_filename: false, overwrite: true,};
        const result = await cloudinary.uploader.upload(img.path, options);
        post.path_img = ("https://res.cloudinary.com/clawgames/image/upload/w_1000,ar_16:9,c_fill/"+result.public_id)
    }
    postCreated = await models.Posts.create(post);
    return res.status(201).send(postCreated)
      
  } catch (error) {
    return next(error);
  } finally {
    if (postCreated) {
      const subscribedUsers = await models.User.findAll({where:{subscribed:true}}) 
      subscribedUsers.forEach((user)=>{
        const mailOptions:any = {
            from: "Remitente",
            to: `${user.getDataValue('email')}`,
            subject: `Primicia: ${postCreated.getDataValue('title')}`,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" />
              <title>Noticia</title>
              <style>
                .fit-picture{
                  width:100%;
                }
              </style>
            <div class="" style="width:50%">
            <img src="${postCreated.getDataValue('path_img')}" class="fit-picture">
            <div class="card-body px-4">
            <h4 class="card-title">Titulo ${postCreated.getDataValue('title')}</h4>
            <p class="card-text">${postCreated.getDataValue('body')}
            </p>
              <div class="row">
                  <div class="col ">
                    <a href="https://tp-frontend.vercel.app/PostAuthor/${postCreated.getDataValue('id')}" class="btn btn-primary text-white " >Leer más</a>
                  </div>
               </div>
              </div>
            </div>
            </body>
          </html>`
        }
        transporter.sendMail(mailOptions, (err: any, info: any) => {
            if (err) {
                console.log('error');
            }
        })
    })
  }
  }
  }


const updatePosts = async (req: any , res: any) => {
  try {
      const PostsID = req.params.id;
      const Posts = await models.Posts.findByPk(PostsID);
      let img;
      if(req.files['myImage']!==undefined){
      img = req.files['myImage'][0];
      }
      if (Posts) {
      
        if(img){
        const options = {use_filename: false, unique_filename: false,overwrite: true,};
          const result = await cloudinary.uploader.upload(img.path, options);
          let cdnImgPath = ("https://res.cloudinary.com/clawgames/image/upload/w_1000,ar_16:9,c_fill/"+result.public_id)
          Posts.set({
            path_img:cdnImgPath
          });
        }
        Posts.set({
          categoryId:req.body.categoryId,
          provinceId:req.body.provinceId,
          title:req.body.title,
          body:req.body.body
        });
        await Posts.save();
        res.status(200).json({ data: Posts,'status':200, error: false });
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


const getPostsByIdWithAuthor = async (req: any, res: any) => {
  try {
    const PostsID = req.params.id;   
    let response:any = await models.Posts.findByPk(PostsID,{
      include: { all: true, nested: true ,paranoid: false },
    });
    if(response){
      response.clicks+=1
      response.save()
    }
    if (response != null) {
      return res.status(200).json({ data: response, error: false });
    }
    else {
      return res.status(404).json({ msg: `Posts not found.`, error: true });
    }
  } catch (error) {
    return res.status(500).json({ msg: error, error: true });
  }
};


const getMostClickedPosts = async (req:any, res:any) => { 
  try {
    const numWeeks = 4;
    const now = new Date();
    const minusWeek = new Date(new Date().setDate(new Date().getDate() - 7 * numWeeks));
    
      const response = await models.Posts.findAll({ order: [["clicks", "DESC"]],
        where: {
          postDate: {
            [Op.gt]: Sequelize.cast(minusWeek, "datetime"),
            [Op.lt]: Sequelize.cast(now, "datetime")
          }
        }
      })
      return res.status(200).json({ data: response, error: false });
  } catch (error) {
      return res.status(500).json({ msg: error, error: true });
  }
};

export { getPostsById, addPosts , getAllPosts , updatePosts , deletePosts,getPostsByIdWithAuthor, getMostClickedPosts};

