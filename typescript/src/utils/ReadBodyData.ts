//Source: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

export async function readBodyData(req, res) : Promise<string>
{
    let body: Array<Uint8Array>;
    let bodyString: string;

    return new Promise((resolve, reject) =>
    {
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
        
          bodyString = Buffer.concat(body).toString();
          // at this point, `body` has the entire request body stored in it as a string
          resolve(bodyString);
        });
    });

}

