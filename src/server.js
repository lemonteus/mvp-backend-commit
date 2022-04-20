import { createServer } from 'http';
import { getAll, getById, postMethod, putMethod, deleteMethod } from './controller/FlightController.js'

const server = createServer((req, res) => {

    const requestString = req.url;
    const requestArray = requestString.split("/");

    const flightId = parseInt(requestArray[2]);

    const { headers } = req
    //console.log(headers);

    if (requestArray[1] === `flights`) {

        if (req.method === "GET") {

            if (!Number.isNaN(flightId)) {
                getById(flightId, req, res);

            } else {
                getAll(req, res);
            }
        
        } else if (req.method === "POST") {

            postMethod(req, res);

        } else if (req.method === "PUT") {

            putMethod(req, res);

        } else if (req.method === "DELETE") {

            deleteMethod(req, res);
        }
    }
    else {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({"mensagem":"erro"}));
    }

})

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})