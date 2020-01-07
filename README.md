# gisquick-accounts-web

## Docker build
```
docker build -t gisquick/web-accounts .
```

## Development


### Project setup
```
npm install
```

In order to start development server, it is required to setup and run local Gisquick deployment
with enabled API for sign up, activation and password reset. By default, Gisquick server is expected
to be running on http://localhost on port 80. For different setup you will have to update proxy server
configuration in ```vue.config.js``` file.

#### More info about configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Compiles and hot-reloads for development
```
npm run serve
```
Project consists of multiple pages:
- ```/signup```
- ```/activate?uid=<UID>&token=<TOKEN>```
- ```/new-password?uid=<UID>&token=<TOKEN>```

### Lints and fixes files
```
npm run lint
```
