const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const errorController = require("./controllers/ErrorController");
const sequelize = require("./utils/database");
const Pokemon = require("./models/Pokemon");
const Region = require("./models/Region");
const Type = require("./models/Type");

//Importing helpers
const compareHelpers = require('./utils/helpers/compare')

//Importing my routes
const PokemonRouter = require("./routes/PokemonRouter");
const RegionRouter = require("./routes/RegionRouter");
const TypeRouter = require("./routes/TypeRouter");

const app = express();

app.engine("hbs", expressHbs.engine({ 
    layoutDir:"views/layouts/", 
    defaultLayout:"main-layout.hbs",
    extname:"hbs",
    helpers:{
        isEqual: compareHelpers.IsEqual
    }
}));

app.set("view engine","hbs");

app.set("views","views");

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,"public")));

app.use(PokemonRouter);
app.use(RegionRouter);
app.use(TypeRouter);

app.use(errorController.Get404);

Pokemon.belongsTo(Region && Type,{constraint: true,onDelete:"CASCADE"});
Region.hasMany(Pokemon);
Type.hasMany(Pokemon);

sequelize.sync().then(result=>{
  app.listen(5000);

}).catch(err =>{
    console.log(err);
})