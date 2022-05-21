const db = require('../db');
const Place = require('../models/place');
const Review = require('../models/review');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createReviews() {
    const allPlaces = await Place.find();

    for (placeInd in allPlaces) {
        let selectedPlace = allPlaces[placeInd];
        const numReviews = Math.floor(Math.random() * 20) + 1;

        for (let i = 0; i <= numReviews; i++) {
            const text = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam atque, ullam, facilis debitis magni, quis ut enim ex quo aspernatur sint molestiae placeat blanditiis. Possimus dolores officia accusamus hic molestiae!';
            const tmpArr = createRandom();
            const review = new Review({
                title: 'Title',
                body: text,
                cleanRating: tmpArr[0],
                speedRating: tmpArr[1],
                serviceRating: tmpArr[2],
                date: new Date().toLocaleString(),
                vote: tmpArr[3],
                report: tmpArr[4],
                rate: tmpArr[5],
                placeID: selectedPlace._id
            });
            await review.save();
            selectedPlace.reviews.push(review._id);
        }
        await Place.findByIdAndUpdate(selectedPlace._id, { reviews: selectedPlace.reviews });
    }
    db.close();
}

function createRandom() {
    const clean = Math.floor(Math.random() * 5) + 1;
    const speed = Math.floor(Math.random() * 5) + 1;
    const service = Math.floor(Math.random() * 5) + 1;
    const vote = Math.floor(Math.random() * 100) - 50;
    const report = Math.floor(Math.random() * 50);
    const rate = Math.round((clean + speed + service) / 3);

    return [clean, speed, service, vote, report, rate];
}

createReviews();
