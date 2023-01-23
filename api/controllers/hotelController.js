import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
// create hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try{
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }catch(err){
        next(err);
    }
}

// update hotel
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true});
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
}

// delete hotel
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted successfully.");
    } catch (err) {
        next(err);
    }
}

// get sigle hotel info
export const getHotel = async (req, res, next) => {
    try {
        const getSingleHotel = await Hotel.findById(req.params.id);
        if(!getSingleHotel) return next(createError(404, "Hotel are not found"));
        res.status(200).json(getSingleHotel);
    } catch (err) {
        next(err);
    }
}

// get all hotel info
export const getHotels = async (req, res, next) => {
    const {min, max, ...others} = req.query;
    try {
        const limitData = req.query.limit;
        const getAllHotels = await Hotel.find({
            ...others,
            cheapestPrice: {$gt: min || 1, $lt: max || 100000},
        }).limit(req.query.limits);
        console.log();
        res.status(200).json(getAllHotels);
    } catch (err) {
        next(err);
    }
}

export const getHotelsCountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city: city});
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const getHotelsCountByType = async (req, res, next) => {
    const hotelCnt = await Hotel.countDocuments({type: 'hotel'});
    const resortCnt = await Hotel.countDocuments({type: 'resort'});
    const apartmentCnt = await Hotel.countDocuments({type: 'apartment'});
    const villaCnt = await Hotel.countDocuments({type: 'villa'});
    const cabinCnt = await Hotel.countDocuments({type: 'cabin'});

    try {
        res.status(200).json([
            {type: "Hotel", count: hotelCnt},
            {type: "Resort", count: resortCnt},
            {type: "Apartment", count: apartmentCnt},
            {type: "Villa", count: villaCnt},
            {type: "Cabin", count: cabinCnt}
        ]);
    } catch (err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) =>{
            return Room.findById(room);
        }));
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}