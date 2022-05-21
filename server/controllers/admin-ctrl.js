const City = require('../models/city');
const Admin = require('../models/admin');
const Place = require('../models/place');
const Review = require('../models/review');
const Question = require('../models/question');

logIn = async (req, res) => {
    try {
        return res.render('AdminLogin');
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in getting the page',
        });
    }
}

validateLogin = async (req, res, next) => {
    try {
        if (req.session.isLogin) {
            return next();
        }
        else {
            return res.redirect('http://localhost:3000/trackvac-api/admin/login');
        }
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in cookie checking',
        });
    }
}


validateAdmin = async (req, res, next) => {
    try {
        if (req.session.isLogin) {
            return res.redirect('http://localhost:3000/trackvac-api/admin/home');
        }
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.redirect('http://localhost:3000/trackvac-api/admin/login');
        }
        const admin = await Admin.findOne({ userName, password });
        if (admin) {
            req.session.isLogin = true;
            req.flash('success', 'Welcome back!');
            return res.redirect('http://localhost:3000/trackvac-api/admin/home');
        }
        return res.redirect('http://localhost:3000/trackvac-api/admin/login');
    }
    catch (e) {
        req.flash('error', 'Error in admin validation');
        return res.send({
            success: false,
            message: 'Error in admin validation',
        });
    }
}

addform = async (req, res) => {
    try {
        return res.render('Addadmin');
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in admin validation',
        });
    }
}

addadmin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.redirect('http://localhost:3000/trackvac-api/admin/home');
        }
        const admin = new Admin({ userName, password });
        await admin.save();

        return res.redirect('http://localhost:3000/trackvac-api/admin/home');
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in admin creating',
        });
    }
}

reviewsFeedback = async (req, res) => {
    try {
        return res.render('AdminReview', { cities: await City.find() });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in getting bad reviews'
        })
    }
}

questionsFeedback = async (req, res) => {
    try {
        return res.render('AdminQuestion', { cities: await City.find() });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in getting bad questions'
        })
    }
}

lowReviews = async () => {
    try {
        const allCities = await City.find();
        const reportedReviews = [];

        for (cityInd in allCities) {
            for (placeInd in allCities[cityInd].places) {
                const place = await Place.findById(allCities[cityInd].places[placeInd]);
                for (reviewInd in place.reviews) {
                    const review = await Review.findById(place.reviews[reviewInd]);
                    if (review.report > 15) {
                        const badReview = {
                            reviewTitle: review.title,
                            reviewBody: review.body,
                            reviewId: review._id
                        }
                        reportedReviews.push(badReview);
                    }
                }
            }
        }
        return reportedReviews.length;
    }

    catch (e) {
        return res.sends({
            success: false,
            message: 'Error in fetching low voted / high reported reviews',
        });
    }
}

lowQuestions = async () => {
    try {
        const allCities = await City.find();
        const LowestQuestions = [];

        for (cityInd in allCities) {
            for (placeInd in allCities[cityInd].places) {
                let place = await Place.findById(allCities[cityInd].places[placeInd]);
                for (questionInd in place.questions) {
                    let question = await Question.findById(place.questions[questionInd]);
                    if (question.vote <= -15) {
                        const badQuestion = {
                            questionBody: question.body,
                            questionId: question._id
                        }
                        LowestQuestions.push(badQuestion);
                    }
                }
            }
        }
        return LowestQuestions.length;
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in fetching low voted questions',
        });
    }
}

logOut = async (req, res) => {
    try {
        req.session.destroy();
        return res.redirect('http://localhost:3000/trackvac-api/admin/login');
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in logging out'
        });
    }
}
home = async (req, res) => {
    try {
        const cities = await City.find();

        const adminReturn = {
            reviewsLength: "≈1500",
            questionsLength: "≈600",
            placesLength: "≈138",
            reportedReviews: 60,
            lowestQuestions: 35,
            cities: cities
        }
        return res.render('Moderatorpt', { adminReturn: adminReturn });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in loading admin page data'
        })
    }
}


module.exports = {
    addform,
    addadmin,
    logIn,
    logOut,
    validateAdmin,
    lowReviews,
    lowQuestions,
    home,
    questionsFeedback,
    reviewsFeedback,
    validateLogin
};