import { Router } from "express";
import verifyToken from "../middlewares/auth.middlewares.js";
import rolestatus from "../middlewares/role.middleware.js";
import { createCompany, createRoadmap } from "../controllers/company.controllers.js";

const router = Router();

router.post("/create", verifyToken, rolestatus("admin"), createCompany);
router.post("/roadmap/create", verifyToken, rolestatus("admin"), createRoadmap);

export default router;