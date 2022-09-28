import express from "express";
import { getHistoryHandler, updateHistoryHandler, postHistoryHandler } from "../controller/historyHandler";
const router : express.Router = express.Router();

router.get("/", getHistoryHandler);
router.post("/", postHistoryHandler);
router.put("/", updateHistoryHandler);

module.exports = router;