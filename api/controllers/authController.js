import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(201).send("User has been created successfully!");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, "User not found"));

        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isValidPassword) return next(createError(400, "Wrong Email or password!"));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

        const {password, isAdmin, ...userDetails} = user._doc;

        res.cookie("access_token", token, {httpOnly: true,}).status(200).json({details: {...userDetails}, isAdmin});

    } catch (err) {
        next(err);
    }
}