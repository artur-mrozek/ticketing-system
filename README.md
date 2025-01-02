# ticketing-system

To run this project, you need to create https cert in current user directory, eg:
```
dotnet dev-certs https -ep "C:\Users\{USERNAME}\.aspnet\https\ticketing-api.pfx" -p {PASSWORD}
dotnet dev-certs https --trust
```

Then you need to create .env file in root direcory conating:
```
CERT_PASSWORD={CERT_PASSWORD}
SA_PASSWORD={DATABASE_SA_PASSWORD}
CONNECTION_STRING={ASP_NET_CONNECTION_STRING}
SIGNING_KEY={JWT_SIGNINGKEY}
```

After this you can just
```
docker-compose up
```
and api will be hosted on port 3001 and frontend on port 5000.
