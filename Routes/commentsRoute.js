const express = require('express');
const router = express.Router({mergeParams: true});
const comment = require('../Models/comment');
const user = require('../Models/users');
const video = require('../Models/videos');

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
  router.delete('/:review_id',(async(req,res)=>{
    const {id, review_id, title} = req.params;
    await video.findByIdAndUpdate(id, {$pull: {reviews: review_id}})
    await comment.findByIdAndDelete(review_id);
    res.redirect(`/course/${title}/lecture/${id}`);
  })
  )
  module.exports = router;