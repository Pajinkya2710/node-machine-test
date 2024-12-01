import express from "express";
import UserController from "../app/UserController";
import { authenticateAndAuthorize } from "../middlewares/AuthorizationMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { userCreateSchema, userUpdateSchema } from "../validations/UserValidator";
const router = express.Router();



router.get(
  "/",
  authenticateAndAuthorize( ["super_admin"]),
  UserController.index
);

router.post(
  "/",
  authenticateAndAuthorize(["super_admin"]),
  validate(userCreateSchema),
  UserController.create
);

router.get(
  "/:id",
  
  authenticateAndAuthorize(["super_admin"]),
  UserController.showById
);
router.put(
  "/:id",
  authenticateAndAuthorize(["super_admin"]),
  validate(userUpdateSchema),
  UserController.update
);

router.delete(
  "/:id",
  authenticateAndAuthorize(["super_admin"]),
  UserController.delete
);

router.get(
  "/:id/enable",
  authenticateAndAuthorize(["super_admin"]),
  UserController.enable
);

router.get(
  "/:id/disable",
  authenticateAndAuthorize(["super_admin"]),
  UserController.disable
);




export default router;
