import { getAllFlights, getFlightById, postFlight, updateFlight, deleteFlight } from '../model/FlightModel.js'
import { readBodyData } from '../utils/RequestData.js'

export async function getAll(req, res) 
{
        const allFlights = await getAllFlights();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(allFlights));

}

export async function getById(id, req, res) 
{
        try {
                const flightById = await getFlightById(id);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(flightById));

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}

export async function postMethod(req, res)
{
        const stringFlight = await readBodyData(req, res);

        try {
                const success = await postFlight(stringFlight);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(success);

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }

        
}

export async function putMethod(req, res)
{
        const stringFlight = await readBodyData(req, res);

        try {
                const success = await updateFlight(stringFlight);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(success);

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}

export async function deleteMethod(req, res)
{
        const stringFlight = await readBodyData(req, res);

        try {
                const success = await deleteFlight(stringFlight);
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(success);

        } catch (err) {

                console.log(err);
                res.writeHead(400, {"Content-Type": "text/html; charset=utf-8"});
                res.end(`<h1> ${err} </h1>`);
        }
}