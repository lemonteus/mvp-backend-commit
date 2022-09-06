import { createServer } from "http";
import { MongoClient, Db, Collection } from "mongodb";
import "dotenv/config";

import { getMethod, postMethod, putMethod, deleteMethod } from './controller/FlightController.js';


    const uri: string = `mongodb+srv://${process.env["DB_USER"]}:${process.env["DB_PASSWORD"]}@${process.env["DB_URL"]}/retryWrites=true&w=majority`
    console.log(uri);

    const client: MongoClient = new MongoClient(uri);
     
    client.connect(err => {
        if (err) return console.error("OCORREU UM ERRO:"+err);
        console.log("Connected to database");
    
        const db: Db = client.db("flights-database");
        const flightsCollection: Collection = db.collection("flights");

        const server = createServer((req, res) => {
    
            const requestString = req.url || '';
            const requestArray = requestString.split("/");
        
            const flightId = parseInt(requestArray[2]);
        
            if (requestArray[1] === `flights`) {
        
                if (req.method === "GET") {
    
                    if (!Number.isNaN(flightId)) {
                        getMethod(req, res, { "id": requestArray[2] }, flightsCollection);
        
                    } else {
                        getMethod(req, res, {}, flightsCollection);
                    }
                
                } else if (req.method === "POST") {
        
                    postMethod(req, res, flightsCollection);
        
                } else if (req.method === "PUT") {
        
                    putMethod(req, res, flightsCollection);
        
                } else if (req.method === "DELETE") {
        
                    if (!Number.isNaN(flightId)) {
                        deleteMethod(req, res, {id: requestArray[2] }, flightsCollection);
                    }
                }
            }
            else {
                res.writeHead(400, {"Content-Type": "application/json"});
                res.end(JSON.stringify({"mensagem":"erro"}));
            }
        });
    
        const { PORT } = process.env;
    
        server.listen(PORT, () => {
            console.log(`Listening to port ${PORT}`);
        });
    });      
 