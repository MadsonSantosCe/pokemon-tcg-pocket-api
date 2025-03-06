import { Router } from "express";
import { upload } from "../libs/multer";
const router = Router();

const pokemonController = require("../controllers/pokemonController");

router.post("/pokemon/cardUpload", upload.single("file"), pokemonController.cardUpload);
router.get("/pokemon", pokemonController.getAll);
router.get("/pokemon/:id", pokemonController.getById);
router.put("/pokemon/:id", pokemonController.update);
router.delete("/pokemon/:id", pokemonController.remove);

export default router;