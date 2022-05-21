const Reply = require('../models/reply');
const Question = require('../models/question');

createReply = async (req, res) => {
    try {
        const { questionID } = req.params;
        const { body } = req.body;
        if (!body || body === '') {
            return res.json({
                success: false,
                error: 'You must provide reply body',
            });
        }
        const reply = new Reply({
            body,
            questionID,
            date: new Date().toLocaleString()
        });
        await reply.save();

        const question = await Question.findById(questionID);
        const updatedReplies = question.replies;
        updatedReplies.push(reply._id);
        await Question.findByIdAndUpdate(questionID, { replies: updatedReplies });

        return res.json({
            success: true,
            message: 'Reply was added succesfully',
        });
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in adding reply',
        });
    }
}

module.exports = { createReply }