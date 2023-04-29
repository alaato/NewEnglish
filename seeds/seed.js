const mongoose = require('mongoose');
const course = require('../Models/courses') 
const vid = require('../Models/videos')
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
const SeedDB = async () =>
{
    await course.deleteMany({});
    console.log('deleted')
    
    const Course1 = new course({
          author: "Admin",
          title: `Zno Bootcamp`,
          price: 59.99,
          img:'images/Zno.svg',
          description: 'Our ZNO English preparation program is designed to provide students with the knowledge and skills they need to excel on the test. We focus on all areas of the exam, including reading, writing, speaking, listening, and grammar, and provide students with ample opportunities to practice and improve their skills through interactive activities and practice tests.',
          points: 
          [
            'Strategies for approaching the different sections of the ZNO English test.',
            'Vocabulary and grammar rules necessary for the ZNO English test.',
            'Techniques for improving reading comprehension skills, including skimming and scanning.'
          ],
          length: 16,
        })
        await Course1.save()
    const Course2 = new course({
          author: "Admin",
          title: `General Bootcamp`,
          price: 59.99,
          img:'images/english.jpg',
          description: 'Our general English preparation program is designed to provide students with the knowledge and skills they need to excel',
          points: 
          [
            'Grammar rules and vocabulary necessary for effective communication in English.',
            'Reading and writing skills to improve comprehension and written communication.',
            'Speaking and listening skills for effective communication in real-world situations.'
          ],
          length: 25,

        })
        await Course2.save()
    const Course3 = new course({
          author: "Admin",
          title: `Pronuncitiaon Bootcamp`,
          price: 59.99,
          img:'images/Frame 1.png ',
          description: 'The Pronunciation Course focuses on improving the sounds and intonation patterns of a foreign language. Students learn phonetic symbols and practice producing sounds accurately in a variety of contexts',
          points: 
          [
            'Identification and practice of sounds in the target language, including vowels, consonants, and diphthongs.',
            'Intonation patterns and stress placement for clear communication in the target language.',
            'Techniques for improving pronunciation, including mouth and tongue positioning.'
          ],
          length: 6,

        })
        await Course3.save()
    
   
}

SeedDB().then(()=>{
mongoose.connection.close();
})