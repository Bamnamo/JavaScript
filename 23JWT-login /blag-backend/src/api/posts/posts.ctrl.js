import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from 'joi';
import posts from "./index";

const {ObjectId} = mongoose.Types;

export const getPostById = async (ctx, next) => {
  const {id} = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    //포스트가 존재하지 않을 떄
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST /api/posts
{
 title: '제목',
 body: '내용',
 tags:  ['태그1','태그2']
*/
export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
    .items(Joi.string())
    .required(),
  }); // 문자열로 이루어진 배열

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }

  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/posts
 */
export const list = async ctx => {
  // query는 문자열이기 때문에 숫자로 변환해 주어야 함
  // 값이 주어지지 않았다면 1을 기본으로 사용
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
    .sort({_id: -1})
    .limit(10)
    .skip((page - 1) * 10)
    .exec();
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
    .map(post => post.toJSON())
    .map(post => ({
      ...post,
      body: post.body.length < 200 ? post.body : `${post.body.slice(0,
          200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/posts/:id
 */
export const read = async ctx => {
  /*
  const {id} = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; //  Not Found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
   */
  ctx.body = ctx.state.post;
};

/*
DELETE /api/posts/:id
 */
export const remove = async ctx => {
  const {id} = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공 했지만 데이터가 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
PATCH /api/posts/:id
{
title:'수정',
body:'수정 내용',
tags: ['수정','태그']
 */
export const update = async ctx => {
  const {id} = ctx.params;
  // write에서 사용한 schema와 비슷 하지만 required()없음
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const {user, post} = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
}