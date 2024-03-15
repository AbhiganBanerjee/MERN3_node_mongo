//import the express module
import * as express from "express";

//import the mongodb module
import * as mongodb from "mongodb";

//import the dotenv module
import * as dotenv from "dotenv";

//Get the env variables
dotenv.config();
const url:any = process.env.MONGO_URI;

//Create this as a sub-module
const fetchAccess:any = express.Router();

//Build the GET REST Service 
fetchAccess.get("/",async (req:any,res:any):Promise<any> =>{
    //Connect with mongodb and get the clientObj
    const clientObj:any = new mongodb.MongoClient(url);

    try{
        //Get the db reference
        const db:any = clientObj.db("mern_project3");

        //Perform the find operation on the collection
        const movies = await db.collection("access").find({}).toArray();

        //Validate the result
        if(movies.length > 0){
            res.status(200).json(movies);
        }else{
            res.status(404).json({"Err":"Fetching unsuccessfull!!"});
        }
    }catch(err){
        res.status(500).json({"Err":"Connection unsuccessfull!!"});
    }finally{
        clientObj.close();
        res.end();
    }
});

//export the module
export default fetchAccess;