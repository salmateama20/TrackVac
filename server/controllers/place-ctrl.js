const City = require('../models/city');
const Place = require('../models/place');
const Reply = require('../models/reply');
const Question = require('../models/question');
const place = require('../models/place');

getPlaces = async (req, res) => {
    try {

        const { cityID } = req.params;
        const city = await City.findById(cityID);

        return res.send(await Place.find({ _id: { $in: city.places } }));
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in fetching places',
        });
    }
}

getPlace = async (req, res) => {
    try {
        const { placeID } = req.params;

        return res.send(await Place.findById(placeID));
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in fetching place',
        });
    }
}

placesArray = async (req, res) => {

    const allPlaces = await Place.find();
    const placesArr = [];

    for (let i = 0; i < allPlaces.length; i++) {
        const tmpPlace = {
            _id: allPlaces[i]._id,
            name: allPlaces[i].name,
            location: allPlaces[i].location
        }
        placesArr.push(tmpPlace);
    }
    return res.send(placesArr);
}

createPlace = async (req, res) => {
    try {
        const { cityID } = req.params;
        const { name, location } = req.body;
        if (!name || !cityID) {
            return res.send({
                success: false,
                error: 'You must provide placeName, location',
            });
        }
        const place = new Place({
            name,
            location: location || 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13822.985791185452!2d31.4414096!3d29.986716!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6e7220116094726d!2z2KfZhNis2KfZhdi52Kkg2KfZhNij2YTZhdin2YbZitipINio2KfZhNmC2KfZh9ix2Kk!5e0!3m2!1sen!2seg!4v1632217284429!5m2!1sen!2seg',
            cityID
        });
        await place.save();

        const city = await City.findById(cityID);
        const updatedPlaces = city.places;
        updatedPlaces.push(place._id);
        await City.findByIdAndUpdate(cityID, { places: updatedPlaces });

        return res.send(place);
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in creating new place',
        });
    }
}

removePlace = async (req, res) => {
    try {
        const { placeID } = req.params;
        const place = await Place.findById(placeID);
        const city = await City.findById(place.cityID);
        const updatedPlaces = city.places.filter((value, index, arr) => {
            if (value != placeID) return value;
        });
        await City.findByIdAndUpdate(place.cityID, { places: updatedPlaces });

        await Review.deleteMany({ _id: { $in: place.reviews } });

        const allQuestions = await Question.find({ _id: { $in: place.questions } });
        for (let i = 0; i < allQuestions.length; i++) {
            const question = allQuestions[i];

            await Reply.deleteMany({ _id: { $in: question.replies } });
        }

        await Question.deleteMany({ _id: { $in: place.questions } });

        await Place.findByIdAndDelete(placeID);

        return res.send({ success: true });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in deleting place',
        });
    }
}

editPlace = async (req, res) => {
    try {
        const { placeID } = req.params;
        const { name, location } = req.body;
        if (!name || !location) {
            return res.send({
                success: false,
                error: 'You must provide placeName, location',
            });
        }
        await Place.findByIdAndUpdate(placeID, { name, location });
        return res.send({ success: true });
    }
    catch (e) {
        return res.send({
            success: false,
            message: 'Error in updating place',
        });
    }
}

module.exports = {
    placesArray,
    getPlaces,
    getPlace,
    createPlace,
    removePlace,
    editPlace
}