//import the express module for building REST services
import * as express from "express";

//import the fs module
import * as fs from "fs";

//import the mongodb module
import * as mongodb from "mongodb";

//import the dotenv for environment variable
import * as dotenv from "dotenv";

//import the multer module for handling upload images
import * as multer from "multer";

//read the environment variable
dotenv.config();
const url:any = process.env.MONGO_URI

//Build this module as a sub-module
const insertGames:any = express.Router();

//Build the Multer storage
const storage:any = multer.diskStorage({
    destination : (req:any,file:any,cb:any):any=>{
        cb(null,"uploads/");
    },
    filename : (req:any,file:any,cb:any):any =>{
        cb(null,file.originalname);
    }
})

//Give this storage to the multer so that it can create the middleware
const upload:any = multer({storage : storage});

//Create a POST request to insert the Galaxy Image as well as other info to MongoDB database
insertGames.post("/",upload.single("image"),async (req:any,res:any):Promise<any>=>{
    //Get the MongoClient and build connection
    const clientObj:any = new mongodb.MongoClient(url);

    try{
        //Get the Database Reference
        const db:any = clientObj.db("mern_project3");

        //Read the image file path.
        const imageData:any = fs.readFileSync(req.file.path);
        //Convert the image directly to base64 url and store this url on mongo
        const base64Data:any = Buffer.from(imageData).toString('base64');

        //Now perform the insert operation of the finalImg along with other infos
        const result:any = await db.collection("games").insertOne({
            "id" : req.body.id,
            "name" : req.body.name,
            "price" : req.body.price,
            "publisher" : req.body.publisher,
            "image" : base64Data
        });

        //validate the result, based on insertedId if defined or not
        if(result.insertedId){
            res.status(200).json(result);
        }else{
            res.status(400).json({"Error":`Insertion Failure!!`});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({"Error":`Error in Connection, try again later!!`});
    }finally{
        clientObj.close();
        res.end();
    }
});

//export the module
export default insertGames;