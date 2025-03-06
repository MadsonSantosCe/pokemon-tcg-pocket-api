import { Router } from "express";
import { upload } from "../libs/multer";
const router = Router();

const pokemonController = require("../controllers/pokemonController");

router.post("/pokemon", pokemonController.create);
router.get("/pokemon", pokemonController.getAll);
router.get("/pokemon/:id", pokemonController.getById);
router.put("/pokemon/:id", pokemonController.update);
router.delete("/pokemon/:id", pokemonController.remove);
router.post("/upload", upload.single("file"), pokemonController.uploadCard);

export default router;