const Place = require('../models/place');
const Reply = require('../models/reply');
const Question = require('../models/question');

getQuestions = async (req, res) => {
    try {
        const { placeID } = req.params;
        const place = await Place.findById(placeID);

        return res.send(await Question.find({ _id: { $in: place.questions } }).populate({ path: 'replies', strictPopulate: false }));
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in fetching question',
        });
    }
}

createQuestion = async (req, res) => {
    try {
        const { placeID } = req.params;
        const { body } = req.body;
        if (!body || body === '') {
            return res.send({
                success: false,
                error: 'You must provide question body',
            });
        }
        const question = new Question({
            body,
            placeID,
            date: new Date().toLocaleString(),
            vote: 0
        });
        await question.save();

        const place = await Place.findById(placeID);
        const updatedQuestions = place.questions;
        updatedQuestions.push(question._id);
        await Place.findByIdAndUpdate(placeID, { questions: updatedQuestions });

        return res.send(question._id)
    }

    catch (e) {
        return res.send({
            success: false,
            message: 'Error in adding a question',
        });
    }

}

removeQuestion = async (req, res) => {
    try {
        const { questionID } = req.params;
        const question = await Question.findById(questionID);
        if (question.replies) await Reply.deleteMany({ _id: { $in: question.replies } });

        const place = await Place.findById(question.placeID);
        const updatedQuestions = place.questions.filter((value, index, arr) => {
            if (value != questionID) return value;
        });
        await Place.findByIdAndUpdate(question.placeID, { questions: updatedQuestions });

        await Question.findByIdAndDelete(questionID);


        return res.send({
            success: true,
            message: 'Question was deleted succesfully',
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in deleting question',
        });
    }
}

updateVote = async (req, res) => {
    try {
        const { questionID } = req.params;
        let { vote } = req.body;

        vote = parseInt(vote);
        await Question.findByIdAndUpdate(questionID, { vote });

        return res.send({
            success: true,
            message: 'Question\'s vote was updated succesfully',
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in updating question\'s vote',
        });
    }
}

module.exports = {
    getQuestions,
    createQuestion,
    removeQuestion,
    updateVote
}