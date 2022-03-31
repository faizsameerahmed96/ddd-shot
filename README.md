# DDD Example

https://user-images.githubusercontent.com/7190108/151861635-1dd4a51a-f8e6-4e44-91de-86ee53bb9de3.mp4



# Environmental variables
Create 2 ```.env``` files at the **root of the 2 subprojects** and add the following info.
## API
```
PORT=3001

PGUSER=postgres
PGHOST=localhost
PGPASSWORD=postgres
PGDATABASE=project
PGPORT=5432
```

## Web App
```
REACT_APP_API_URL=http://localhost:3001/api
```

## How to run

1. Start postgres locally and create a database using the API environmental variables info.
2. This project does not implement migrations so you will need to restore the databases through PG admin (check readme folder for file). 
3. Run yarn install and yarn start from root directory to start both projects
