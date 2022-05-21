const db = require('../db/index');
const City = require('../models/city');
const Place = require('../models/place');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let homeValues = [];

statistics = async () => {
    try {
        const allCities = await City.find();
        const statArray = [];

        for (cityInd in allCities) {
            let cleanPlace = await Place.findById(allCities[cityInd].places[0]);
            let speedPlace = cleanPlace;
            let servicePlace = cleanPlace;

            const tmpArr = await statHelper(cleanPlace);

            let avgClean = tmpArr[0];
            let avgSpeed = tmpArr[1];
            let avgService = tmpArr[2];

            for (placeInd in allCities[cityInd].places) {
                const place = await Place.findById(allCities[cityInd].places[placeInd]);
                const avgArray = await statHelper(await place.populate({ path: 'reviews' }));

                cleanPlace = avgArray[0] > avgClean ? place : cleanPlace;
                speedPlace = avgArray[1] > avgSpeed ? place : speedPlace;
                servicePlace = avgArray[2] > avgService ? place : servicePlace;

                avgClean = avgArray[0] > avgClean ? avgArray[0] : avgClean;
                avgSpeed = avgArray[1] > avgSpeed ? avgArray[1] : avgSpeed;
                avgService = avgArray[2] > avgService ? avgArray[2] : avgService;
            }

            const place = await Place.find({ name: cleanPlace.name });

            const topPlace = {
                cityName: allCities[cityInd].name,
                topClean: {
                    placeName: cleanPlace.name,
                    cleanRate: avgClean,
                    location: place[0].location
                },
                topSpeed: {
                    placeName: speedPlace.name,
                    speedRate: avgSpeed,
                    location: place[0].location
                },
                topService: {
                    placeName: servicePlace.name,
                    serviceRate: avgService,
                    location: place[0].location
                }
            }

            statArray.push(topPlace);
        }
        return statArray;
    }
    catch (e) {
        return [];
    }
}

async function statHelper(place) {
    try {
        let sumClean = 0;
        let sumSpeed = 0;
        let sumService = 0;

        for (reviewInd in place.reviews) {
            const review = place.reviews[reviewInd];
            sumClean += review.cleanRating;
            sumSpeed += review.speedRating;
            sumService += review.serviceRating;
        }

        const avgClean = Math.ceil(sumClean / place.reviews.length) || 0;
        const avgSpeed = Math.ceil(sumSpeed / place.reviews.length) || 0;
        const avgService = Math.ceil(sumService / place.reviews.length) || 0;

        return [avgClean, avgSpeed, avgService];
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in calculating',
        });
    }
}

getValues = async () => {
    try {
        let tmpArr = [];
        while (tmpArr.length == 0) {
            tmpArr = await statistics();
        }
        homeValues = tmpArr;
    }
    catch (e) {
        return;
    }
}

rend = async (req, res) => {
    try {
        if (req.params.lang == 'ar') {
            return await res.render('index_ar.ejs', { homeReturn: homeValues });
        }
        return await res.render('index_en.ejs', { homeReturn: homeValues });
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in loading home page data',
        });
    }
}

rendAbout = async (req, res) => {
    try {
        if (req.params.lang == 'ar') {
            return await res.render('about_ar.ejs');
        }
        return await res.render('about_en.ejs');
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in loading about data',
        });
    }
}

redirectHome = async (req, res) => {
    try {
        return res.redirect('http://localhost:3000/trackvac-api/home/en');
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in loading home page data',
        });
    }
}

redirectAbout = async (req, res) => {
    try {
        return res.redirect('http://localhost:3000/trackvac-api/about/en');
    }
    catch (e) {
        return res.json({
            success: false,
            message: 'Error in loading home page data',
        });
    }
}

module.exports = { rend, rendAbout, getValues, redirectHome, redirectAbout };