import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel, getHotelsCountByCity, getHotelsCountByType, getHotelRooms } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post('/',verifyAdmin, createHotel);

//Update
router.put('/:id',verifyAdmin, updateHotel)

//Delete
router.delete("/:id",verifyAdmin, deleteHotel);

//Get
router.get("/find/:id", getHotel);

//Get all
router.get("/", getHotels);

router.get("/countByCity", getHotelsCountByCity);
router.get("/countByType", getHotelsCountByType);
router.get("/room/:id", getHotelRooms);


export default router;