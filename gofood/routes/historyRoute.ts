import express from "express";
import { getOrderHandler, updateOrderHandler, postOrderHandler } from "../controller/historyHandler";

const router : express.Router = express.Router();

router.get("/", getOrderHandler);
router.post("/", postOrderHandler);
router.put("/", updateOrderHandler);


module.exports = router;
