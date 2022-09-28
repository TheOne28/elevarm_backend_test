import express from "express";
import { loginHandler, registerHandler} from "../controller/authenticationHandler";

const router : express.Router = express.Router();

router.get("/", loginHandler);
router.post("/", registerHandler);

module.exports = router;