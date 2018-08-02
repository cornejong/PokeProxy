# PokeProxy
A reverse Proxy for running multiple domains/services on a single outgoing IP/Server. 

### Disclaimer
The current version is a very crude and basic version. It works but isn't elegant. Future versions will implement log files, Authentication and a more elaborate error handling system.

## Getting Started
To get started with Poke you first have to add the desired target locations to the 'services.json' file in the 'data' directory.
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
```

Currently 'name' is optional, but keeps it just a bit more readable and clear.

## Running Poke
To start Poke on the default port of 80 you have to start it with 'sudo' or atleast on OSX.

```console
cd poke
sudo node server
```

If you want to set another port for poke to listen to you can either edit the 'server.js' file or provide it via an environment variable.

```console
sudo PORT=8080 node server
```