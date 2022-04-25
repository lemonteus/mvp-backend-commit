//import { getAllFlights, getFlightById, postFlight, updateFlight, deleteFlight } from '../model/FlightModel.js'
import { readBodyData } from '../utils/ReadBodyData.js'

export async function getMethod(req, res, query, flightsCollection)
{
        try {   
                await flightsCollection.find(query).toArray(function(err, result) {
                        if (err) throw err;
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify(result));
                      });                

        } catch (err) {
                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}

//Deprecated

/*export async function getById(id, req, res, flightsCollection) 
{
        try {
                const flightById = await getFlightById(id);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(flightById));

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}



export async function getAll(req, res, flightsCollection) 
{
        const allFlights = await getAllFlights();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(allFlights));

}*/

export async function postMethod(req, res, flightsCollection)
{
        const stringFlight = await readBodyData(req, res);
        const { id, name, callsign, country, active } = JSON.parse(stringFlight);

        const jsonFlight = { id, name, callsign, country, active };

        try {
                const success = await flightsCollection.insertOne(jsonFlight);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(success));

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }        
}

export async function putMethod(req, res, flightsCollection)
{
        const stringFlight = await readBodyData(req, res);
        const jsonFlight = JSON.parse(stringFlight);

        try {
                const result = await flightsCollection.updateOne({id : jsonFlight.id}, { $set: jsonFlight });
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(result));

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}

export async function deleteMethod(req, res, query, flightsCollection)
{
        console.log(query);
        try {
                const success = await flightsCollection.deleteOne(query);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(success));

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}