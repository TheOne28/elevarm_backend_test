import express from "express";
import { getMenuHandler, updateMenuHandler, deleteMenuHandler, postMenuHandler } from "../controller/menuHandler";

const router : express.Router = express.Router();

router.get("/", getMenuHandler);
router.post("/", postMenuHandler);
router.put("/", updateMenuHandler);
router.delete("/", deleteMenuHandler);


module.exports = router;
