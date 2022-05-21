const express = require('express');
const catchAsync = require('../utils/catchAsync');
const PlaceCtrl = require('../controllers/place-ctrl');

const router = express.Router();

router.get('/place/placesarray', catchAsync(PlaceCtrl.placesArray))
    .get('/places/:cityID', catchAsync(PlaceCtrl.getPlaces))
    .get('/place/:placeID', catchAsync(PlaceCtrl.getPlace))
    .put('/place/:placeID', catchAsync(PlaceCtrl.editPlace));

module.exports = router;