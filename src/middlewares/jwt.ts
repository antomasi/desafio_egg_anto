import { Request, Response, NextFunction} from "express";
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res:Response, next: NextFunction) => {

  console.log('REQ->', req.headers);
  
  const token = <string> req.headers['auth'];
  let jwtPayload: {userId: any, dni: any};

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    return res.status(401).send();
  }
  const {userId, dni} = jwtPayload;
  const newToken =jwt.sign({userId, dni}, config.jwtSecret, {expiresIn: '1h'});
  console.log(newToken);
  res.setHeader('token', newToken);
  next();
}