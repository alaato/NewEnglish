const express = require('express');
const router = express.Router();
const {comment} = require('../Models/questions');
const user = require('../Models/users');

router.post('',(async (req, res)=>{
    const {id} = req.params
    const camp = await Campground.findOne({number:id})
    const review = new Review(req.body)
    review.author = req.user._id
    camp.reviews.push(review)
    await review.save()
    await camp.save()
    res.redirect(`/campgrounds/${id}`)
    
  }))
  router.delete('/:review_id',(async(req,res)=>{
    const {id, review_id} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: review_id}})
    await Review.findByIdAndDelete(review_id);
    res.redirect(`/campgrounds/${id}`);
  })
  )
  module.exports = router;