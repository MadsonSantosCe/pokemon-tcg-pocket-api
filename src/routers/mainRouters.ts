import { Router } from "express";
import { upload } from "../libs/multer";
const router = Router();

const cardController = require("../controllers/cardController");

router.post("/card/upload", upload.single("file"),  cardController.cardUpload);
router.get("/card", cardController.getAll);
router.get("/card/:id", cardController.getById);
router.put("/card/:id", cardController.update);
router.delete("/card/:id", cardController.remove);

export default router;
