
# Boiler Plate

A brief description of what this project does and who it's for

## How to run it


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DEFAULT_API_PREFIX`

`NODE_ENV`

`PLATFORM`


## Installation

Install my-project with npm

```bash
  yarn
  
```

Run locally

```bash
  yarn dev    
```

```bash
  yarn build
  yarn start  
```

Docker

```bash
 yarn build
 docker-compose --env-file .docker.env  up -d --build 
 docker-compose down --remove-orphans   
```
    