import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom);

router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

router.get("/:id",getRoom);
router.get("/", getRooms);


export default router;