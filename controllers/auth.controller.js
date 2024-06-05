import bcrypt from "bcrypt";
import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.handler.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created sucessfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return next(errorHandler(404, "User not found"));
    }

    const existingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!existingPassword) {
      return next(errorHandler(401, "Unauthorized"));
    }
    existingUser.password = undefined;
    const options = {
      expiresIn: "2d",
      algorithm: "HS256",
    };

    const token = jwt.sign(
      { ...existingUser },
      process.env.JWT_SECRET_KEY,
      options
    );
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json(existingUser);
  } catch (error) {
    next(error);
  }
};
