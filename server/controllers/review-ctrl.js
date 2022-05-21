const Place = require('../models/place');
const Review = require('../models/review');

getReviews = async (req, res) => {
    try {
        const { placeID } = req.params;
        const place = await Place.findById(placeID);

        return res.send(await Review.find({ _id: { $in: place.reviews } }));
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in fetching reviews',
        });
    }
}

createReview = async (req, res) => {
    try {
        const { placeID } = req.params;
        const { title, body, cleanRating, speedRating, serviceRating, rate } = req.body;
        if (!title || !body || !serviceRating) {
            return res.send({
                success: false,
                error: 'You must provide review title, body, and rating',
            });
        }
        const review = new Review({
            title,
            body,
            cleanRating: cleanRating || 1,
            speedRating: speedRating || 1,
            serviceRating: serviceRating || 1,
            placeID,
            date: new Date().toLocaleString(),
            vote: 0,
            report: 0,
            rate
        });
        await review.save();

        const place = await Place.findById(placeID);
        const updatedReviews = place.reviews;
        updatedReviews.push(review._id);
        await Place.findByIdAndUpdate(placeID, { reviews: updatedReviews });

        return res.send(review._id);
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in adding review',
        });
    }
}

removeReview = async (req, res) => {
    try {
        const { reviewID } = req.params;

        const review = await Review.findById(reviewID);
        const place = await Place.findById(review.placeID);

        const updatedReviews = place.reviews.filter((value, index, arr) => {
            if (value != reviewID) return value;
        });
        await Place.findByIdAndUpdate(review.placeID, { reviews: updatedReviews });

        await Review.findByIdAndDelete(reviewID);

        return res.send({
            success: true,
            message: 'Review was deleted succesfully',
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in deleting review',
        });
    }
}

updateVote = async (req, res) => {
    try {
        const { reviewID } = req.params;
        let { vote } = req.body;

        vote = parseInt(vote);
        await Review.findByIdAndUpdate(reviewID, { vote });

        return res.send({
            success: true,
            message: 'Review\'s vote was updated succesfully',
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in updating review\'s vote',
        });
    }
}

updateReport = async (req, res) => {
    try {
        const { reviewID } = req.params;
        const review = await Review.findById(reviewID);

        const ReviewReports = parseInt(review.report) + 1;

        await Review.findByIdAndUpdate(reviewID, { report: ReviewReports });

        return res.send({
            success: true,
            message: 'Review\'s report was updated succesfully',
        });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in updating review\'s report',
        });
    }
}

module.exports = {
    getReviews,
    createReview,
    removeReview,
    updateVote,
    updateReport
}