const db = require('../db');
const Reply = require('../models/reply');
const Question = require('../models/question');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createReplies() {
    const allQuestions = await Question.find();

    for (questionInd in allQuestions) {
        let selectedQuestion = allQuestions[questionInd];
        const numReplies = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i <= numReplies; i++) {
            const reply = new Reply({
                body: 'No Comment!!!',
                date: new Date().toLocaleString(),
                questionID: selectedQuestion._id
            });

            await reply.save();
            selectedQuestion.replies.push(reply._id);
        }
        await Question.findByIdAndUpdate(selectedQuestion._id, { replies: selectedQuestion.replies });
    }
    db.close();
}

createReplies();