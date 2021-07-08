import { Router } from "express";
import AuthController from '../Controller/AuthController';

const routes = Router();

routes.post('/login', AuthController.login);

export default routes;