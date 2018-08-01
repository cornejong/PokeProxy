/*
*	Poke - Multi Service / Domail Proxy
*
*/


console.log('Starting to Poke');

// Setup Dependencies
const http = require('http')
const httpProxy = require('http-proxy');
const fs = require('fs');

// Load Services object
var serviceTable = fs.readFileSync('data/services.json');

// Setup main proxy
const proxy = {
    port: 80,
    host: "localhost",
    services: JSON.parse(serviceTable)
};

// Create a proxy for each service and store it with the asoc data
proxy.services.forEach((service, index)  => {
    proxy.services[index].proxy = new httpProxy.createProxyServer({
        target: service.target
    });
});


http.createServer((req, res) => {

    proxy.services.forEach((service, index) => {
        if(req.headers.host === service.host) {
            service.proxy.proxyRequest(req, res);
            service.proxy.on('error', (err, req, res) => {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            }); 
        }
    });

}).listen(proxy.port);

console.log('Ready to Catch them all!');
