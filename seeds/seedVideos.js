const mongoose = require('mongoose');
const video = require('../Models/videos')
const unit = require('../Models/units')
const course = require('../Models/courses')
const dbUrl = "mongodb+srv://snowflake:wT5wBkMHoKbCm4I2@cluster0.dpoq4pf.mongodb.net/?retryWrites=true&w=majority"

main().catch(err => console.log(err));

async function main() {
    try {
        console.log("connected mongoose");
        await mongoose.connect(dbUrl);
      } catch (error) {
        handleError(error);
      }
      mongoose.connection.on('error', err => {
        logError(err);
      });
}
const SeedGeneral = async() =>{
  const Course = await course.findOne({title :'General Bootcamp'})


  Course.unit = []


  const UnitOneUrl = [{url:"https://www.youtube.com/embed/sZtwNWC4FsE", title : 'Present simple'},{ url :'https://www.youtube.com/embed/tPDSjoCFd9k', title : 'present simple vs continuous'}]
  const UnitTwoUrl = [{url:"https://www.youtube.com/embed/MI3S3kdkofo", title : 'past simple'}, {url:"https://www.youtube.com/embed/_XP4le29BAM", title : 'past simple vs continuous'}, {url:"https://www.youtube.com/embed/_uvxU7shktc", title: 'Practice'}]
  const UnitThreeUrl = [{url:"https://www.youtube.com/embed/cfNMrfGcZXw", title : 'futre simple'},{url :"https://www.youtube.com/embed/1zWuafmkCJ8", title : 'futre continuous'}]
  for (let i = 1; i < 4 ; i++)
  {
    const Unit = new unit({
      title: `Unit ${i}`,
      order: i,
      course : Course.id
    }
    )
    await Unit.save()
  }
  const UnitOne = await unit.findOne({title: 'Unit 1',course: Course.id})

  for(let i=0; i<UnitOneUrl.length; i++) {
    const Video = new video({
      url : UnitOneUrl[i].url,
      title: UnitOneUrl[i].title,
      order : i+1,
      unit : UnitOne.id,
    })
    await Video.save()
    UnitOne.video.push(Video.id)
  }
  await UnitOne.save()

  const UnitTwo = await unit.findOne({title : 'Unit 2',course: Course.id})


  for(let i=0; i<UnitTwoUrl.length; i++) {
    const Video = new video({
      url : UnitTwoUrl[i].url,
      title: UnitTwoUrl[i].title,
      order : i+1,
      unit : UnitTwo.id
    })
    await Video.save()

    UnitTwo.video.push(Video.id)
  }
  await UnitTwo.save()

  const UnitThree = await unit.findOne({title : 'Unit 3',course: Course.id})


  for(let i=0; i<UnitThreeUrl.length; i++) {
    const Video = new video({
      url : UnitThreeUrl[i].url,
      title: UnitThreeUrl[i].title,
      order : i+1,
      unit : UnitThree.id
    })
    await Video.save()
    UnitThree.video.push(Video.id)
  }
  await UnitThree.save()

  await Course.unit.push(UnitOne.id, UnitTwo.id, UnitThree.id)
  await Course.save()
  const popCourse = await course.findOne({ title: 'General Bootcamp' }).populate({
    path: 'unit',
    populate: {
      path: 'video',
      select : 'title'
    }
  })
  console.log(popCourse, Course.id)

}
const SeedPro = async() =>{
  const Course = await course.findOne({title :'Pronuncitiaon Bootcamp'})
  Course.unit = []


  const UnitOneUrl = [
  {url:"https://www.youtube.com/embed/dtt9qGyCSPs", title : 'Intro'},
  {url :"https://www.youtube.com/embed/R1Lf3E4r4Yk", title : 'Silent R'}, 
  {url: "https://www.youtube.com/embed/C8_nlvzCrbg", title : 'the /ɑː/'}
]

  const Unit = new unit({
    title: `Unit 1`,
    order: 1,
    course : Course.id
  }
  )
  await Unit.save()

  const UnitOne = await unit.findOne({ title: 'Unit 1', course: Course.id });


  for(let i=0; i<UnitOneUrl.length; i++) {
    const Video = new video({
      url : UnitOneUrl[i].url,
      title: UnitOneUrl[i].title,
      order : i+1,
      unit : UnitOne.id,
    })
    await Video.save()
    UnitOne.video.push(Video.id)
  }
  await UnitOne.save()

  await Course.unit.push(UnitOne.id)
  await Course.save()
  await Course.populate('unit')
  console.log(Course)

}

const SeedZno = async function (){
  const Course = await course.findOne({title :'Zno Bootcamp'})
  Course.unit = []
  console.log('deleted')
  const UnitOneUrl = [{url:"https://www.youtube.com/embed/dDwTTWWEk1w", title : 'lesson 1'},
  {url :"https://www.youtube.com/embed/P7MEDqAYKr4", title : 'lesson 2'}, 
  {url: "https://www.youtube.com/embed/7dZYcWbRFzk", title : 'lesson 3'}]
  const UnitTwoUrl = [{url:"https://www.youtube.com/embed/6-ZQ7grM6sM", title : 'lesson 1'},
  {url :"https://www.youtube.com/embed/MM45UAQ7L7o", title : 'lesson 2'}, ]

 for (let i = 1; i < 3 ; i++)
  {
    const Unit = new unit({
      title: `Unit ${i}`,
      order: i,
      course : Course.id
    }
    )
    await Unit.save()
  }
  
  const UnitOne = await unit.findOne({title:'Unit 1', course: Course.id})

  for(let i=0; i<UnitOneUrl.length; i++) {
    const Video = new video({
      url : UnitOneUrl[i].url,
      title: UnitOneUrl[i].title,
      order : i+1,
      unit : UnitOne.id,
    })
    await Video.save()
    UnitOne.video.push(Video.id)
  }
  await UnitOne.save()
  const UnitTwo = await unit.findOne({title: 'Unit 2', course: Course.id})

  for(let i=0; i<UnitTwoUrl.length; i++) {
    const Video = new video({
      url : UnitTwoUrl[i].url,
      title: UnitTwoUrl[i].title,
      order : i+1,
      unit : UnitTwo.id,
    })
    await Video.save()
    UnitTwo.video.push(Video.id)
  }
  await UnitTwo.save()

  await Course.unit.push(UnitOne.id, UnitTwo.id)
  await Course.save()
  await Course.populate('unit')
  console.log(Course, Course.id)

}

const Seed = async ()=>{
  await video.deleteMany({});
  await unit.deleteMany({})
  await SeedZno()
  await SeedGeneral()
  await SeedPro().then(()=>{
    mongoose.connection.close();
    })
}
Seed();
 

