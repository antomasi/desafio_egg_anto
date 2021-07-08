import { Router } from "express";
import {UserController} from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";

const routes = Router();

routes.get('/', UserController.getAll);

routes.get('/:id', UserController.getById);

routes.post('/', UserController.createUser);

routes.patch('/:id', UserController.editUser);

routes.delete('/:id', UserController.deleteUser);

export default routes;