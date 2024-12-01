import express from "express";
import AdminController from "../app/AdminController";
const router = express.Router();

//Admin login to token
router.post("/login", AdminController.login);

export default router;
