/*
*	Poke - Multi Service / Domail Proxy
*
*/


console.log('Starting to Poke');

// Setup Dependencies
const express = require('express');
const http = require('http')
const httpProxy = require('http-proxy');
const fs = require('fs');

// Load Services object
var serviceTable = fs.readFileSync('./data/services.json');

// Setup main proxy
const proxy = {
    port: 80,
    host: "localhost",
    services: JSON.parse(serviceTable)
};


/* TEMP */

// TODO!
// For all of proxy.services
// new httpProxy.createProxyServer
// Store object in proxy.services.[].proxy

// Create a proxy for each service and store it with the asoc data
proxy.services.forEach((service, index)  => {
    proxy.services.index.porxy = new httpProxy.createProxyServer({
        target: service.target
    });
});

/* var proxy_web = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8080
        }
    }); */

http.createServer((req, res) => {

    // TODO!
        // For all of proxy.services
        // if req.header.host === proxy.services.host
            // do stuff...

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

/*         if (req.headers.host === 'http://www.domain.com') {
            proxy_web.proxyRequest(req, res);
            proxy_web.on('error', function(err, req, res) {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            });
        } else if (req.headers.host === 'http://api.domain.com') {
            proxy_api.proxyRequest(req, res);
            proxy_api.on('error', function(err, req, res) {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            });
        } */
}).listen(proxy.port);

/* END TEMP */

console.log('Ready to Catch them all');
