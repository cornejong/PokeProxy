# PokeProxy
A reverse Proxy for running multiple domains/services on a single outgoing IP/Server. 

### Disclaimer
The current version is a very crude and basic version. It works but isn't elegant. Future versions will implement log files, Authentication and a more elaborate error handling system.

## Setup
To setup the proxy to forward requests to a specific target/service you just add the service to the 'services.json' file in the 'data' directory.
A service entry has a only two required key => value pairs: 'target' and 'host'. Checkout the example below.

```JSON
{
    "name": "serviceName",
    "host": "http://mydomain.com",
    "target": {
        "host": "localhost",
        "port": 8000
    }
}
,,,