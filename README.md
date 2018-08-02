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

### The console logs
Poke currently logs all request made to the proxy host:port. A log for a simple web page can look like this:
First we get the unix timestamp of the request. Followed by the request method.
After that we find the request host wich points to the service target.
And last we have the requested url path.
```console
sudo node server
> 1533230445 | Starting to Poke
> 1533230445 | Ready to Catch them all! | on port 80

> 1533230480 | GET | localhost => localhost:7888 |> /sc/
> 1533230480 | GET | localhost => localhost:7888 |> /sc/libs/ionicons/dist/css/ionicons.min.css
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/css/app.min.css
> 1533230480 | GET | localhost => localhost:7888 |> /sc/libs/jquery/dist/jquery.min.js
> 1533230480 | GET | localhost => localhost:7888 |> /sc/html/scripts/scrollto.js
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.rtl.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.dark.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.8.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.7.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.6.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.5.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/libs/ionicons/dist/fonts/ionicons-v=3.0.0-alpha.3.woff2
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.4.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.3.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.2.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.1.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/assets/images/layout.png
> 1533230480 | GET | localhost => localhost:7888 |> /sc/libs/ionicons/dist/css/ionicons.min.css.map
```