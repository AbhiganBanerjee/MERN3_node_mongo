//import the express module for DELETE REST Service
import * as express from "express";

//import the mongodb module
import * as mongodb from "mongodb";

//import the dotenv
import * as dotenv from "dotenv";

//create this as a sub module
const delBooks:any = express.Router();

//Get the env properties
dotenv.config();
const url:any = process.env.MONGO_URI;

//Create a DELETE REST Service on this module
delBooks.delete("/",async (req:any,res:any):Promise<any>=>{
    //Create the clientObj and build connection with mongodb
    const clientObj:any = new mongodb.MongoClient(url);

    try{
        //Get the Database reference
        const db:any = clientObj.db("mern_project3");

        //Perform the Deleted operation based on the query parameter passed from the react app
        const delRes:any = await db.collection("books").deleteOne({"name":req.query.name});

        //Validate the results
        if(delRes.deletedCount > 0){
            res.status(200).json({"Success":`Deletion of ${req.query.name} Successful...`});
        }else{
            res.status(400).json({"Error":`Deletion Unsuccessfull!!`});
        }
    }catch(err){
        res.status(500).json({"Error":`Error in Connection!!`})
    }finally{
        clientObj.close();
        res.end();
    }
});

//export the module
export default delBooks;