import express from "express";
import { authenticateAndAuthorize } from "../middlewares/AuthorizationMiddleware";
import RoleController from "../app/RoleController";
const router = express.Router();



router.get("/",  authenticateAndAuthorize(["super_admin"]),RoleController.index);

// Create a new role
router.post("/",  authenticateAndAuthorize(["super_admin"]),RoleController.create);

// Get a single role by ID
router.get("/:id",authenticateAndAuthorize(["super_admin"]),RoleController.showById);

// Update a role by ID
router.put("/:id",authenticateAndAuthorize(["super_admin"]),RoleController.update);

// Delete a role by ID
router.delete("/:id", authenticateAndAuthorize(["super_admin"]),RoleController.delete);

//Assign the user
router.post("/:id/users/", authenticateAndAuthorize( ['super_admin']), RoleController.createAssign);



export default router;
