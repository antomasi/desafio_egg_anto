import { Router } from "express";
import auth from './auth.routes';
import users from './users.routes';

const routes = Router();

routes.use('/users', users);

routes.use('/auth', auth);

export default routes;
