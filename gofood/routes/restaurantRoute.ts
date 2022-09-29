import express from "express";
import { getRestoHandler, updateRestoHandler, postRestoHandler, deleteRestoHandler } from "../controller/restaurantHandler";

const router : express.Router = express.Router();

router.get("/", getRestoHandler);
router.post("/", postRestoHandler);
router.put("/", updateRestoHandler);
router.delete("/", deleteRestoHandler);


module.exports = router;
