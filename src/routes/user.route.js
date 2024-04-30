import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";



export const userRouter =  Router();
const userController = new UserController();

userRouter.post('/register', userController.registerUser);
userRouter.post('/')