import jwt from 'jsonwebtoken';
// const { Response } = require('express');
export const SECRET = 'SECr3t';  // This should be in an environment variable in a real application
import {Request , Response , NextFunction} from 'express';

export const authenticateJwt = (req : Request , res : Response , next : NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err : jwt.VerifyErrors | null , user : jwt.JwtPayload ) => {
      if (err) {
        return res.sendStatus(403);
      }
      if(!user) {
        return res.status(400).json({ message : "Invalid"})
      }
      if (typeof user === 'string') {
        return res.status(400).json({ message : "Invalid"})
      }

      req.headers["userId"] = user.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


