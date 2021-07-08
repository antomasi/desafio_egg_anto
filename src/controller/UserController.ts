import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";

export class UserController {

    static getAll = async (req: Request, res:Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find();
        if(users.length > 0){
            res.send(users);
        }else{
            return res.status(404).json({message:'No hay datos cargados'})
        }
    }

    static getById = async (req: Request, res:Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (e) {
            return res.status(404).json({message:'Usuario inexistente'});
        }
    }

    static createUser = async (req: Request, res:Response) => {
        const {nombre, apellido, password, dni} = req.body;

        const user = new User();

        user.nombre = nombre;
        user.apellido = apellido;
        user.dni = dni;
        user.password = password;

        const errors = await validate(user);
        if(errors.length > 0){
            res.status(409).json(errors);
        }

        const userRepository = getRepository(User);
        
        try {
            user.hashPassword();
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).json({message:'DNI ya registrado'});
        }
        res.send('Usuario Creado!');
    }

    static editUser = async (req: Request, res:Response) => {
        let user:User; 
        const {id} = req.params;
        const {nombre, apellido, dni} = req.body;
        
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(id);
            user.nombre = nombre;
            user.apellido = apellido;
            user.dni = dni;
        } catch (e) {
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        const errors = await validate(user);
        if(errors.length > 0) {
            res.status(400).json({message:'Todos los campos son obligatorios'});
        }
        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(409).json({message:'Usuario ya registrado'});
        }
        res.send('Usuario Editado');
    }

    static deleteUser = async (req: Request, res:Response) => {
        let user:User;
        const {id} = req.params;
        const userRepository = getRepository(User);
        try {
            user =await userRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({message:'Usuario inexistente'});
        }
        userRepository.delete(user);
        res.send('Usuario Eliminado');
    }
}
export default UserController;