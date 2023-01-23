import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/userController.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken,  (req, res, next) => {
//     res.send("Hello user you are authenticate");
// })

router.get("/", verifyAdmin, getUsers);

router.get("/:id", verifyUser, getUser);

router.put("/:id", verifyUser, updateUser);

router.delete("/:id",verifyUser, deleteUser);

export default router;