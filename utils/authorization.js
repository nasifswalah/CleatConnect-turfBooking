import { errorHandler } from "./error.handler";
import jwt from "jsonwebtoken";

export const adminAuthorization = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return next(errorHandler(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (user && user._doc.role === "admin") {
        req.user = user;
        next();
      } else {
        next(errorHandler(403, "Forbidden"))
      };
    });
  } catch (error) {
    next(error)
  }
};


export const userAuthorization = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return next(errorHandler(401, "Unauthorized"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        next(errorHandler(403, "Forbidden"))
      };
    });
  } catch (error) {
    next(error)
  }
};
