import flightsData from '../data/flights.json' assert {type: "json"};
import fs from 'fs'

const DATA_PATH = `/home/lemontea/Documentos/Commit/mvp-backend-commit/src/data/flights.json`;

export function getAllFlights()
{
    return new Promise((resolve, reject) => {

        resolve(flightsData);

    });
}

export function getFlightById(reqId)
{
    const flights = flightsData;
    return new Promise ((resolve, reject) => {

        if (reqId > 0)
        {
            const flight = flights.find((item) => item.id == reqId);
            if (typeof flight !== 'undefined') {
                console.log(flight);
                resolve(flight);
            } else {
                reject("ERROR: Couldn't find flight");
            }

        } else {

            reject("ERROR: Invalid flight id");
        }

    });
}

export function postFlight(stringFlight)
{
    const flights = flightsData;
    const jsonFlight = JSON.parse(stringFlight);

    return new Promise ((resolve, reject) => {

        //promise tinha q dar erro de invalid json quando o parse n der certo tb
        if (jsonFlight.id > 0) 
        {
            //instanciando só pra verificar se é undefined?
            const flight = flights.find((item) => item.id == jsonFlight.id);

            if(typeof flight === 'undefined')
            {
                flights.push(jsonFlight);

                //Source: https://nodejs.dev/learn/the-nodejs-fs-module
                fs.writeFile(DATA_PATH, JSON.stringify(flights), err => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    resolve(jsonFlight);
                });

            } else {
                reject(`ERROR: Flight ID already exists (${jsonFlight.id})`);
            }

        } else {
            reject("ERROR: Invalid JSON request body");
        }

    });
    
}

export function updateFlight(stringFlight) {

    const flights = flightsData;
    const jsonFlight = JSON.parse(stringFlight);

    return new Promise ((resolve, reject) => {

        if (jsonFlight.id > 0) 
        {
            const flight = flights.find((item) => item.id == jsonFlight.id);
            const reqId = jsonFlight.id;

            if(typeof flight !== 'undefined')
            {                
                for (const prop in jsonFlight)
                {
                    if (prop !== "id")
                        flights[reqId][prop] = jsonFlight[prop];
                }

                //Source: https://nodejs.dev/learn/the-nodejs-fs-module
                fs.writeFile(DATA_PATH, JSON.stringify(flights), err => {
                    if (err) {
                        console.error(err)
                        return
                    }

                    resolve(stringFlight);
                });

            } else {
                reject(`ERROR: Flight ID does not exist (${jsonFlight.id})`);
            }

        } else {
            reject("ERROR: Invalid JSON request body");
        }

    });


}

export function deleteFlight(stringFlight) {

    const flights = flightsData;
    const jsonFlight = JSON.parse(stringFlight);
    const reqId = jsonFlight.id-1;

    return new Promise ((resolve, reject) => {

        if (jsonFlight.id > 0) 
        {
            const flight = flights.find((item) => item.id == reqId);

            if(typeof flight !== 'undefined')
            {             
                if (reqId <= flight[flight.length-1].id)   {
                    flights.pop(flight);

                    //Source: https://nodejs.dev/learn/the-nodejs-fs-module
                    fs.writeFile(DATA_PATH, JSON.stringify(flights), err => {
                        if (err) {
                            console.error(err)
                            return
                        }

                        resolve(stringFlight);
                    });
                } else {
                    reject(`ERROR: Flight ID does not exist (${jsonFlight.id})`);
                }

            } else {
                reject(`ERROR: Flight ID does not exist`);
            }

        } else {
            reject("ERROR: Invalid JSON request body");
        }

    });

}