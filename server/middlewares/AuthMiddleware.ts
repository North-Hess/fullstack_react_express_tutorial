import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../routes/users.js";

export interface UserRequest extends Request {
  username?: string | JwtPayload;
}

export const validateToken = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });
  try {
    const validToken = jwt.verify(accessToken, "importantsecret");
    req.username = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
