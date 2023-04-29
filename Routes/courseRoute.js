const express = require('express');
const router = express.Router();
const Course = require('../Models/courses');
const unit = require('../Models/units');
const Videos = require('../Models/videos');
const {UserExists, UserHasCourse} = require('../middlewares/auth');

router.get('/:title', async(req, res) => {
  const {title} = req.params;
  const User = req.user
  const course = await Course.findOne({title:title}).populate(
    {path: 'unit',
      populate: { 
        path : 'video'
      }
    });
  if (User){
    await User.populate('subscribedCourses')
  }
    res.render('Courses/courseinfo', {course,User});
  })

  router.get('/:title/subscribe',UserExists, async(req, res) => {
    let hasCourse = false;
    const {title} = req.params;
    const course = await Course.findOne({title:title});
    const User = req.user;
    await User.populate('subscribedCourses')
    for (let Subcourse of User.subscribedCourses)
    {
      if (course.id == Subcourse.id)
      {
        hasCourse = true;
      }
    }
    if (!hasCourse)
    {
      User.subscribedCourses.push(course._id);
      await User.save()
      res.redirect(`/userinfo`)
    }
    else
    {
      res.redirect(`/userinfo`)

    }

  })
router.get('/:title/lecture/:id',UserExists, UserHasCourse, async(req, res) => {
  const {id,title} = req.params;
  const course = await Course.findOne({title}).populate(
    {path: 'unit',
      populate: { 
        path : 'video'
      }
    });
  const Video = await Videos.findById(id).populate({
    path: 'comments',
    populate: [
      { path: 'author' },
      { path: 'replies', populate: { path: 'author' } }
    ]
  });
  res.render('Courses/videoshow', {Video, course});
  })
module.exports = router;