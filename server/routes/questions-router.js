const express = require('express');
const catchAsync = require('../utils/catchAsync');
const UserCtrl = require('../controllers/user-ctrl');
const CityCtrl = require('../controllers/city-ctrl');
const ReplyCtrl = require('../controllers/reply-ctrl');
const PlaceCtrl = require('../controllers/place-ctrl');
const QuestionCtrl = require('../controllers/question-ctrl');

const router = express.Router();

router.get('/questions', catchAsync(CityCtrl.getCities))
    .get('/questions/:cityID', catchAsync(PlaceCtrl.getPlaces))
    .get('/questions/:cityID/:placeID', catchAsync(QuestionCtrl.getQuestions))
    .post('/questions/:placeID', catchAsync(QuestionCtrl.createQuestion))
    .post('/questions/addreply/:questionID', catchAsync(ReplyCtrl.createReply))
    .put('/questions/vote/:questionID', catchAsync(QuestionCtrl.updateVote));

module.exports = router;