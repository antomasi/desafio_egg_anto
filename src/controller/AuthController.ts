import { Request, Response} from "express";
import {getRepository} from "typeorm";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res:Response) => {

    const {dni, password} = req.body;

    if(dni=='' && password==''){
      return res.status(400).json({message:'DNI y Password son obligatorios'})
    }

    const userRepository = getRepository(User);

    let user: User;
    try {
      user = await userRepository.findOneOrFail({where: {dni}});
    } catch (e) {
      return res.status(400).json({message:'DNI o Password incorrectos'})
    }

    if(!user.checkPassword(password)){
      return res.status(400).json({message:'Username or Password are incorrect!'})
    }

    const token = jwt.sign({userId: user.id, dni: user.dni}, config.jwtSecret, {expiresIn: '1h'});

    res.json({user, token});
  }
}

export default AuthController;
