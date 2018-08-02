/*
*	Poke - Multi Service / Domail Proxy
*
*/


// Setup Dependencies
const http = require('http')
const httpProxy = require('http-proxy');
const fs = require('fs');
const chalk = require('chalk');

// Setting up the terminal interface object
const t = {};
t.o = chalk.yellow('> '); 
t.y = chalk.yellow;

console.log(t.o + 'Starting to ' + chalk.yellow('Poke'));

// Load Services object
var serviceTable = fs.readFileSync('data/services.json');

// Setup main proxy object
const proxy = {
    port: process.env.PORT || 80,
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

            console.log(t.o + req.method + ' | ' + t.y(req.headers.host) + ' => ' + t.y(service.target.host) + ':' + t.y(service.target.port) + ' |> ' + req.url);
            
            service.proxy.on('error', (err, req, res) => {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            }); 
        }
    });

}).listen(proxy.port);

console.log(chalk.green(t.o + 'Ready to Catch them all! | on port ' + proxy.port + '\n'));
