//Source: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

export function readBodyData(req, res)
{
    let body = [];

    return new Promise((resolve, reject) =>
    {
        req.on('data', (chunk) => {
          body.push(chunk);
        }).on('end', () => {
        
          body = Buffer.concat(body).toString();
          // at this point, `body` has the entire request body stored in it as a string
          resolve(body);
        });
    });

}

