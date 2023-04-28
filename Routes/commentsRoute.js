const express = require('express');
const router = express.Router({mergeParams: true});
const comment = require('../Models/comment');
const reply = require('../Models/reply');
const user = require('../Models/users');
const video = require('../Models/videos');
const {isCommentAuthor,isreplyAuthor} = require('../middlewares/auth');

router.post('',(async (req, res)=>{
    const {id, title} = req.params
    console.log(id, title)
    const Video = await video.findById(id)
    console.log(Video)
    const Comment = new comment(req.body)
    Comment.author = req.user._id
    Video.comments.push(Comment)
    await Comment.save()
    await Video.save()
    res.redirect(`/course/${title}/lecture/${id}`)
    
  }))
  router.post('/:review_id',(async(req,res)=>{
    const {review_id, title, id} = req.params
    console.log(review_id)
    const Comment = await comment.findById(review_id)
    console.log(Comment)
    const Reply = new reply(req.body)
    Reply.author = req.user._id
    await Reply.save()
    Comment.replies.push(Reply)
    await Comment.save()
    res.redirect(`/course/${title}/lecture/${id}`)
  }))
  router.delete('/:review_id',isCommentAuthor, (async(req,res)=>{
    const {id, review_id, title} = req.params;
    await video.findByIdAndUpdate(id, {$pull: {reviews: review_id}})
    await comment.findByIdAndDelete(review_id);
    res.redirect(`/course/${title}/lecture/${id}`);
  }))
  router.delete('/:review_id/:reply_id',isreplyAuthor, (async(req,res)=>{
    const {id, review_id, title, reply_id } = req.params;
    await comment.findByIdAndUpdate(id, {$pull: {replies: reply_id}})
    await reply.findByIdAndDelete(reply_id);
    res.redirect(`/course/${title}/lecture/${id}`);
  }))
  module.exports = router;