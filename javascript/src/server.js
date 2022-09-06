import { createServer } from "http";
import { MongoClient } from "mongodb";
import {} from "dotenv/config";

import { getMethod, postMethod, putMethod, deleteMethod } from './controller/FlightController.js'

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/FlightDatabase?retryWrites=true&w=majority`

console.log(uri);

MongoClient.connect(uri, (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to database");

    const db = client.db("flights-database");
    const flightsCollection = db.collection("flights");

    const server = createServer((req, res) => {

        const requestString = req.url;
        const requestArray = requestString.split("/");
    
        const flightId = parseInt(requestArray[2]);
            
        //const { headers } = req
        //console.log(headers);
    
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

