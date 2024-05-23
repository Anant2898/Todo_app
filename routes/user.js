import express from "express"
import {  register, login, getMyProfile, logout} from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();



router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuth ,getMyProfile);
    
export default router;
