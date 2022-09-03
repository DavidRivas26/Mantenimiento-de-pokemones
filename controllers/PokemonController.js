const Pokemon = require("../models/Pokemon");
const Region = require("../models/Region");
const Type = require("../models/Type");

exports.GetPokemonsList = (req, res, next) => {
    Pokemon.findAll({include:[{model: Region && Type}]})
      .then((result) => {
        const pokemons = result.map((result) => result.dataValues);     
  
        res.render("pokemons/list-pokemons", {
          pageTitle: "Pokemons",
          homeActive: true,
          pokemons: pokemons,
          hasPokemons: pokemons.length > 0
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetCreatePokemons = (req, res, next) => {
    Region.findAll()
    .then((result) => {
      const regions = result.map((result) => result.dataValues);

      Type.findAll()
      .then((result) => {
        const types = result.map((result) => result.dataValues);

        res.render("pokemons/sv-up-pokemons", {
          pageTitle: "Create pokemons",
          homeActive: true,
          editMode: false,
          regions: regions,
          hasRegions: regions.length > 0,
          types: types,
          hasTypes: types.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    })
    .catch((err) => {
      console.log(err);
    })
        
  };
  
  exports.PostCreatePokemons = (req, res, next) => {
    const pokemonName = req.body.Name;
    const pokemonImageURL = req.body.Image;
    const pokemonRegion = req.body.Region;
    const pokemonType = req.body.Type;
  
    Pokemon.create({
      name: pokemonName,
      image: pokemonImageURL,
      regionId: pokemonRegion,
      typeId: pokemonType,
    })
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetEditPokemons = (req, res, next) => {
    const edit = req.query.edit;
    const pokemonId = req.params.pokemonsId;
  
    if (!edit) {
      return res.redirect("/");
    }
  
    Pokemon.findOne({ where: { id: pokemonId } })
      .then((result) => {
        const pokemon = result.dataValues;   
  
        if (!pokemon) {
          return res.redirect("/");
        }
  
        console.log(pokemon);
    
      Region.findAll()
        .then((result) => {
          const regions = result.map((result) => result.dataValues);

          Type.findAll()
          .then((result) => {
            const types = result.map((result) => result.dataValues);
  
            res.render("pokemons/sv-up-pokemons", {
              pageTitle: "Edit pokemons",
              homeActive: true,
              editMode: edit,
              pokemon: pokemon,
              regions: regions,
              hasRegions: regions.length > 0,
              types: types,
              hasTypes: types.length > 0,
            });
          })
          .catch((err) => {
            console.log(err);
          });

        })
        .catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostEditPokemons = (req, res, next) => {
    const pokemonName = req.body.Name;
    const pokemonImageURL = req.body.Image;
    const pokemonRegion = req.body.Region;
    const pokemonType = req.body.Type;
    const pokemonId = req.body.pokemonsId;
  
    Pokemon.update(
      { name: pokemonName, image: pokemonImageURL, regionId: pokemonRegion, typeId: pokemonType },
      { where: { id: pokemonId } }
    )
      .then((result) => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.PostDeletePokemons = (req, res, next) => {
    const pokemonId = req.body.pokemonsId;
  
    Pokemon.destroy({ where: { id: pokemonId } })
      .then((result) => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };