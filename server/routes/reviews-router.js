const express = require('express');
const catchAsync = require('../utils/catchAsync');
const CityCtrl = require('../controllers/city-ctrl');
const UserCtrl = require('../controllers/user-ctrl');
const PlaceCtrl = require('../controllers/place-ctrl');
const ReviewCtrl = require('../controllers/review-ctrl');

const router = express.Router();

router.get('/reviews', catchAsync(CityCtrl.getCities))
    .post('/reviews/validation', catchAsync(UserCtrl.validateUser))
    .get('/reviews/:cityID', catchAsync(PlaceCtrl.getPlaces))
    .get('/reviews/:cityID/:placeID', catchAsync(ReviewCtrl.getReviews))
    .post('/reviews/:placeID', catchAsync(ReviewCtrl.createReview))
    .put('/reviews/vote/:reviewID', catchAsync(ReviewCtrl.updateVote))
    .put('/reviews/report/:reviewID', catchAsync(ReviewCtrl.updateReport));


module.exports = router;