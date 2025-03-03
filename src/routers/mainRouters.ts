import { Router } from "express";
const router = Router();

const pokemonController = require("../controllers/pokemonController");

router.post("/pokemon", pokemonController.create);
router.get("/pokemon", pokemonController.getAll);
router.get("/pokemon/:id", pokemonController.getById);
router.put("/pokemon/:id", pokemonController.update);
router.delete("/pokemon/:id", pokemonController.remove);

export default router;