const express = require("express");

const router = express.Router();

const pokemonController = require("../controllers/PokemonController");

router.get("/",pokemonController.GetPokemonsList);
router.get("/create-pokemons", pokemonController.GetCreatePokemons);
router.post("/create-pokemons", pokemonController.PostCreatePokemons);
router.get("/edit-pokemons/:pokemonsId", pokemonController.GetEditPokemons);
router.post("/edit-pokemons", pokemonController.PostEditPokemons);
router.post("/delete-pokemons", pokemonController.PostDeletePokemons);

module.exports = router;