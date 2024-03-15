"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import the express module for REST services
var express = require("express");
//import the body-parser module 
var bodyParser = require("body-parser");
//import the cors module
var cors = require("cors");
//import the dotenv module
var dotenve = require("dotenv");
//import the sub-modules
var FetchGalaxies_1 = require("./modules/galaxies/FetchGalaxies");
var DeleteGalaxies_1 = require("./modules/galaxies/DeleteGalaxies");
var FetchMovies_1 = require("./modules/movies/FetchMovies");
var InsertGalaxies_1 = require("./modules/galaxies/InsertGalaxies");
var InsertGames_1 = require("./modules/games/InsertGames");
var FetchGames_1 = require("./modules/games/FetchGames");
var DeleteGames_1 = require("./modules/games/DeleteGames");
var DeleteMovies_1 = require("./modules/movies/DeleteMovies");
var InsertMovies_1 = require("./modules/movies/InsertMovies");
var InsertAnimes_1 = require("./modules/animes/InsertAnimes");
var FetchAnimes_1 = require("./modules/animes/FetchAnimes");
var DeleteAnimes_1 = require("./modules/animes/DeleteAnimes");
var InsertBooks_1 = require("./modules/books/InsertBooks");
var FetchBooks_1 = require("./modules/books/FetchBooks");
var DeleteBooks_1 = require("./modules/books/DeleteBooks");
var InsertProducts_1 = require("./modules/products/InsertProducts");
var FetchProducts_1 = require("./modules/products/FetchProducts");
var DeleteProducts_1 = require("./modules/products/DeleteProducts");
var InsertAccess_1 = require("./modules/access/InsertAccess");
var FetchAccess_1 = require("./modules/access/FetchAccess");
var DeleteAccess_1 = require("./modules/access/DeleteAccess");
//config the env and get the env variables
dotenve.config();
var port = process.env.PORT;
//Create a REST object
var app = express();
//Add the json MIME type to the REST object using bodyparser
app.use(bodyParser.json());
//take the urlencoded using bodyparser to read the form data
app.use(bodyParser.urlencoded({ extended: false }));
//add the cors policy, to avoid CORS issues
app.use(cors());
//use the sub-modules here
app.use("/fetchGalaxies", FetchGalaxies_1.default);
app.use("/deleteGalaxy", DeleteGalaxies_1.default);
app.use("/insertGalaxies", InsertGalaxies_1.default);
app.use("/fetchMovies", FetchMovies_1.default);
app.use("/deleteMovie", DeleteMovies_1.default);
app.use("/insertMovies", InsertMovies_1.default);
app.use("/fetchGames", FetchGames_1.default);
app.use("/insertGames", InsertGames_1.default);
app.use("/deleteGame", DeleteGames_1.default);
app.use("/insertAnimes", InsertAnimes_1.default);
app.use("/fetchAnimes", FetchAnimes_1.default);
app.use("/deleteAnime", DeleteAnimes_1.default);
app.use("/insertBooks", InsertBooks_1.default);
app.use("/fetchBooks", FetchBooks_1.default);
app.use("/deleteBook", DeleteBooks_1.default);
app.use("/insertProducts", InsertProducts_1.default);
app.use("/fetchProducts", FetchProducts_1.default);
app.use("/deleteProduct", DeleteProducts_1.default);
app.use("/insertAccess", InsertAccess_1.default);
app.use("/fetchAccess", FetchAccess_1.default);
app.use("/deleteAccess", DeleteAccess_1.default);
//start the server by assigning a port number
app.listen(port, function () {
    console.log("Server Started at port no. : ".concat(port));
});
/*
    {
        "_id": "65f32d068d30edc8e64acc1d",
        "id": 1,
        "name": "Milky Way",
        "type": "Barred Spiral Galaxy",
        "distance": "26,670 light years",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1280px-ESO-VLT-Laser-phot-33a-07.jpg"
    }
    
    {
        "_id": "65f331ce8d30edc8e654f53c",
        "id": 1,
        "name": "Interstellar",
        "type": "Science Fiction",
        "Director": "Christopher Nolan",
        "image": "https://ih1.redbubble.net/image.3987112530.7554/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
    }
*/ 
