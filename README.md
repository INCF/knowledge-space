# KnowledgeSpace

# Acknowledgement

This project/research has received funding from the European Union’s Horizon 2020 Framework Programme for Research and Innovation under the Specific Grant Agreement No. 945539 (Human Brain Project SGA3).

## Summary

This is a new new version of the knowledge-space.org application. It is a web
application that uses the following:

- [React](https://reactjs.org/) Javscript library for UI ( for the frontend )

These require some dependencies for both running the application & development.
These include:

- [NodeJS](https://nodejs.org/en/) Node.js runtime

## Quick Start

If you do not have all the dependencies listed above installed, please see the
information below about installing them.

> npm install

You will need to point the application to your ElasticSearch index. This is
done in the .env file. Make sure that CORS is configured for your ES server.

> Create .env file with elastic credentials (private)

### Environment variables

A template with safe placeholder values is provided in
[`.env.example`](.env.example). Create your local `.env` from it and fill in
your own values (`.env` is git-ignored, never commit it):

Linux / macOS:

> cp .env.example .env

Windows (PowerShell):

> Copy-Item .env.example .env

| Variable | Required | Description |
| --- | --- | --- |
| `REACT_APP_ES_DATASPACE_URL` | Yes | URL of the Elasticsearch index holding the DataSpace documents |
| `REACT_APP_ES_DATASPACE_USER` | Yes | Elasticsearch username (HTTP basic auth) |
| `REACT_APP_ES_DATASPACE_PASS` | Yes | Elasticsearch password (HTTP basic auth) |
| `REACT_APP_API_END_POINT` | Yes | Base URL of the app including trailing slash, used to build entity links (e.g. `http://localhost:3000/` in development) |
| `NEO4J_PROTOCOL_UBERON`, `NEO4J_HOST_UBERON`, `NEO4J_PORT_UBERON`, `NEO4J_USERNAME_UBERON`, `NEO4J_PASSWORD_UBERON` | Only for `/graph/*` routes | Connection details of the UBERON Neo4j database |
| `NEO4J_PROTOCOL_NIFSTD`, `NEO4J_HOST_NIFSTD`, `NEO4J_PORT_NIFSTD`, `NEO4J_USERNAME_NIFSTD`, `NEO4J_PASSWORD_NIFSTD` | Only for `/graph/*` routes | Connection details of the NIFSTD Neo4j database |
| `REACT_APP_GA_TRACKING_ID` | No | Google Analytics tracking ID; tracking is disabled when empty |

The Node server listens on port `5000` and the React dev server proxies API
requests to it (see `proxy` in `package.json`).

Run application locally

Start node server

> npm run server

Start React client

> npm run start

## Deploying to Production

> Check Gitlab CI file
