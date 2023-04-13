const express = require('express');
const router = express.Router();
const Course = require('../Models/courses');
const Videos = require('../Models/videos');

router.get('/:title', async(req, res) => {
  const {title} = req.params;
  console.log(title)
  const course = await Course.findOne({title:title});
    res.render('Courses/courseinfo', {course});
  })
  router.post('/:title/subscribe', async(req, res) => {
    const {title} = req.params;
    const user = req.user;
    console.log(title)
    const course = await Course.findOne({title:title});
    user.subscribedCourses.push(course._id);

  })
router.get('/:title/lecture/:id', async(req, res) => {
  const id = req.params.id;
  console.log(id)
  const video = await Videos.findOne({order:id});
  console.log(video.url)
  res.render('Courses/videoshow', {video});
  })
module.exports = router;