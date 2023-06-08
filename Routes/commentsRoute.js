const express = require('express');
const router = express.Router({mergeParams: true});
const comment = require('../Models/comment');
const reply = require('../Models/reply');
const user = require('../Models/users');
const video = require('../Models/videos');
const {isCommentAuthor,isreplyAuthor} = require('../middlewares/auth');

router.post('',(async (req, res)=>{
    const {id, title} = req.params
    const Video = await video.findById(id)
    const Comment = new comment(req.body)
    Comment.author = req.user._id
    Video.comments.push(Comment)
    await Comment.save()
    await Video.save()
    res.redirect(`/course/${title}/lecture/${id}`)
    
  }))
  router.post('/:review_id',(async(req,res)=>{
    const {review_id, title, id} = req.params
    const Comment = await comment.findById(review_id)
    const Reply = new reply(req.body)
    Reply.author = req.user._id
    Comment.replies.push(Reply)
    await Reply.save()
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
    await comment.findByIdAndUpdate(review_id, {$pull: {replies: reply_id}})
    await reply.findByIdAndDelete(reply_id);
    res.redirect(`/course/${title}/lecture/${id}`);
  }))
// Example route for liking a post
router.put('/:review_id/like', async (req, res) => {
  try {
    const {review_id} = req.params;
    const action = req.body.action; // Action can be 'like' or 'unlike'
    const Comment = await comment.findById(review_id);
    const User = req.user.id
    const isLiked = Comment.likes.includes(User);
    if (isLiked) {
      // User has already liked the comment, perform unlike action
      Comment.likes.pull(User);
    } else {
      // User hasn't liked the comment, perform like action
      Comment.likes.push(User);
    }
    await Comment.save();

    // Logic to update the like count for the post based on the action
    // You can fetch the post from the database, update the like count, and save it back to the database

    // Return the updated like count to the client
     // Example, replace with the actual updated count
    res.json({ message: 'Action successful', LikesCount: Comment.likes.length});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.put('/:review_id/:reply_id/like', async (req, res) => {
  try {
    const {reply_id} = req.params;
    const Reply = await reply.findById(reply_id);
    const User = req.user.id
    console.log(Reply)
    const isLiked = Reply.likes.includes(User);
    if (isLiked) {
      // User has already liked the comment, perform unlike action
      Reply.likes.pull(User);
    } else {
      // User hasn't liked the comment, perform like action
      Reply.likes.push(User);
    }
    await Reply.save();

    // Logic to update the like count for the post based on the action
    // You can fetch the post from the database, update the like count, and save it back to the database

    // Return the updated like count to the client
     // Example, replace with the actual updated count
    res.json({ message: 'Action successful', LikesCount: Reply.likes.length});
  } catch (error) {
    console.error(error);}
});

  module.exports = router;