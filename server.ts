//import the express module for REST services
import * as express from "express";

//import the body-parser module 
import * as bodyParser from "body-parser";

//import the cors module
import * as cors from "cors";

//import the dotenv module
import * as dotenve from "dotenv";

//import the sub-modules
import fetchGalaxies from "./modules/galaxies/FetchGalaxies";
import delGalaxies from "./modules/galaxies/DeleteGalaxies";
import fetcMovies from "./modules/movies/FetchMovies";
import insertGalaxies from "./modules/galaxies/InsertGalaxies";
import insertGames from "./modules/games/InsertGames";
import fetchGames from "./modules/games/FetchGames";
import delGames from "./modules/games/DeleteGames";
import delMovies from "./modules/movies/DeleteMovies";
import insertMovies from "./modules/movies/InsertMovies";
import insertAnimes from "./modules/animes/InsertAnimes";
import fetchAnimes from "./modules/animes/FetchAnimes";
import delAnimes from "./modules/animes/DeleteAnimes";
import insertBooks from "./modules/books/InsertBooks";
import fetchBooks from "./modules/books/FetchBooks";
import delBooks from "./modules/books/DeleteBooks";
import insertProducts from "./modules/products/InsertProducts";
import fetchProducts from "./modules/products/FetchProducts";
import delProducts from "./modules/products/DeleteProducts";
import insertAccess from "./modules/access/InsertAccess";
import fetchAccess from "./modules/access/FetchAccess";
import delAccess from "./modules/access/DeleteAccess";

//config the env and get the env variables
dotenve.config();
const port:any = process.env.PORT;

//Create a REST object
const app:any = express();

//Add the json MIME type to the REST object using bodyparser
app.use(bodyParser.json());

//take the urlencoded using bodyparser to read the form data
app.use(bodyParser.urlencoded({extended:false}));

//add the cors policy, to avoid CORS issues
app.use(cors());

//use the sub-modules here
app.use("/fetchGalaxies",fetchGalaxies);
app.use("/deleteGalaxy",delGalaxies);
app.use("/insertGalaxies",insertGalaxies);

app.use("/fetchMovies",fetcMovies);
app.use("/deleteMovie",delMovies);
app.use("/insertMovies",insertMovies);

app.use("/fetchGames",fetchGames);
app.use("/insertGames",insertGames);
app.use("/deleteGame",delGames);

app.use("/insertAnimes",insertAnimes);
app.use("/fetchAnimes",fetchAnimes);
app.use("/deleteAnime",delAnimes);

app.use("/insertBooks",insertBooks);
app.use("/fetchBooks",fetchBooks);
app.use("/deleteBook",delBooks);

app.use("/insertProducts",insertProducts);
app.use("/fetchProducts",fetchProducts);
app.use("/deleteProduct",delProducts);

app.use("/insertAccess",insertAccess);
app.use("/fetchAccess",fetchAccess);
app.use("/deleteAccess",delAccess);

//start the server by assigning a port number
app.listen(port,():any=>{
    console.log(`Server Started at port no. : ${port}`);
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