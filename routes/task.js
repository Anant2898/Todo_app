import express from "express";
import { newTask, fetchTasks, updateTask, deleteTask } from "../controllers/task.js";
import { isAuth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/new", isAuth, newTask);
router.get("/fetchTasks", isAuth, fetchTasks);
router.route("/:id").put(isAuth, updateTask).delete(isAuth, deleteTask)

export default router;