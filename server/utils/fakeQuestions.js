const db = require('../db');
const Place = require('../models/place');
const Question = require('../models/question');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createQuestions() {
    const allPlaces = await Place.find();

    for (placeInd in allPlaces) {
        let selectedPlace = allPlaces[placeInd];
        const numQuestions = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i <= numQuestions; i++) {
            const vote = Math.floor(Math.random() * 100) - 50;
            const question = new Question({
                body: 'to be or not to be?',
                date: new Date().toLocaleString(),
                vote: vote,
                placeID: selectedPlace._id
            });

            await question.save();
            selectedPlace.questions.push(question._id);
        }
        await Place.findByIdAndUpdate(selectedPlace._id, { questions: selectedPlace.questions });
    }
    db.close();
}

createQuestions();