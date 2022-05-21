const express = require('express');
const catchAsync = require('../utils/catchAsync');
const AdminCtrl = require('../controllers/admin-ctrl');
const PlaceCtrl = require('../controllers/place-ctrl');
const ReviewCtrl = require('../controllers/review-ctrl');
const QuestionCtrl = require('../controllers/question-ctrl');

const router = express.Router();

router.get('/admin/login', catchAsync(AdminCtrl.logIn))
    .get('/admin/logut', catchAsync(AdminCtrl.logOut))
    .get('/admin/addadmin', catchAsync(AdminCtrl.validateLogin), catchAsync(AdminCtrl.addform))
    .get('/admin/placesarr', catchAsync(AdminCtrl.validateLogin), catchAsync(PlaceCtrl.placesArray))
    .post('/admin/addadmin', catchAsync(AdminCtrl.validateLogin), catchAsync(AdminCtrl.addadmin))
    .get('/admin/home', catchAsync(AdminCtrl.validateLogin), catchAsync(AdminCtrl.home))
    .get('/admin/questions', catchAsync(AdminCtrl.validateLogin), catchAsync(AdminCtrl.questionsFeedback))
    .get('/admin/reviews', catchAsync(AdminCtrl.validateLogin), catchAsync(AdminCtrl.reviewsFeedback))
    .delete('/admin/reviews/:reviewID', catchAsync(AdminCtrl.validateLogin), catchAsync(ReviewCtrl.removeReview))
    .delete('/admin/question/:questionID', catchAsync(AdminCtrl.validateLogin), catchAsync(QuestionCtrl.removeQuestion))
    .delete('/admin/place/:placeID', catchAsync(AdminCtrl.validateLogin), catchAsync(PlaceCtrl.removePlace))
    .post('/admin/validateAdmin', catchAsync(AdminCtrl.validateAdmin))
    .post('/admin/place/:cityID', catchAsync(AdminCtrl.validateLogin), catchAsync(PlaceCtrl.createPlace))
    .put('admin/edit/:placeID', catchAsync(AdminCtrl.validateLogin), catchAsync(PlaceCtrl.editPlace));

module.exports = router;