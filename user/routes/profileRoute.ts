import express from "express";
import { updateUserHandler, getProfileHandler } from "../controller/profileHandler";

const router : express.Router = express.Router();

router.get("/", getProfileHandler);
router.patch("/", updateUserHandler);

module.exports = router;