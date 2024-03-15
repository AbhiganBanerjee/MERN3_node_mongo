//import express module for building REST services
import * as express from "express";

//import the mongodb module
import * as mongodb from "mongodb";

//import the dotenv module
import * as dotenv from "dotenv";

//config the env file and read the env variables
dotenv.config();
const url:any = process.env.MONGO_URI;

//Build this module as a sub-module
const fetchGames:any = express.Router();

//build a GET REST Service for this module
fetchGames.get("/",async (req:any,res:any):Promise<any>=>{
    //Get the clientObj and build connection
    const clientObj:any = new mongodb.MongoClient(url);

    try{
        //Get the database reference 
        const db:any = clientObj.db("mern_project3");

        //Perform the find operation on the particular collection
        const games:any = await db.collection("games").find({}).toArray();

        //Validate the result
        if(games.length > 0){
            res.status(200).json(games);
        }else{
            res.status(404).json({"msg":"Error in fetching games!!"});
        }
    }catch(err){
        res.status(500).json({"err":"Error in Connection!!!"});
    }finally{
        clientObj.close();
        res.end();
    }
});


//export the module
export default fetchGames;