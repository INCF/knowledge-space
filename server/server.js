#!/usr/bin/env node
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
// const fs = require('fs');
// const https = require('https');

// to be able to read environment variables
// const dotenv = require('dotenv');
const dotenv = require("dotenv");
dotenv.config();
// allow cross domain access
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

app.use(express.static(path.resolve(__dirname, "../build")));

// document.write("Hi! welcome");
// api routes
const custom = require("./routes/other-routes.js");
const client_routes = require("./routes/client-routes.js");
const esUtils = require("./utility/ES-utils.js");
app.use("/graph/", custom.router);
app.use("/entity/", client_routes);

app.get("/external/:external_id/:type", async (req, res) => {
  let finalData = [];
  const exter_id = "'" + req.params.external_id + "'";
  const atlas = exter_id.split(":")[0];
  const id = exter_id.split(":")[1];
  const cypher_query =
    " MATCH (atlas)<-[definedby:subClassOf]-(label)-[:`http://uri.interlex.org/tgbugs/uris/readable/delineates`]->(anatomy)" +
    " WHERE toUpper(atlas.abbreviation) = " +
    atlas +
    "' AND split(label.iri,\"/\")[-1] = '" +
    id +
    " AND exists(atlas.abbreviation)" +
    ' RETURN anatomy.`http://www.geneontology.org/formats/oboInOwl#id` as curie, toUpper(atlas.abbreviation) + ":" + split(label.iri,"/")[-1] as search_id';
  const data = await custom.runGraphQuery(cypher_query, "NIFSTD");
  if (data[0] && data[0]._fields) {
    const curie = data[0]._fields[0]; // for curie
    const slug = await esUtils.findSlugByCurie(curie);
    const slugDetails = await esUtils.findBySlug(slug);
    finalData = await esUtils.getSpecificDetails(
      slugDetails,
      req.params.type,
      slug
    );
  }
  res.send(finalData);
});

// eveything else will be served to the client
app.get("/*", function (req, res) {
  res.sendFile(path.join(path.resolve(__dirname, "../build"), "index.html"));
});

app.listen(5000, (req) => {
  // console.debug(app.address());
  console.debug("listerning");
});

// var privateKey = fs.readFileSync('/etc/letsencrypt/live/knowledge-space.org/privkey.pem');
// var certificate = fs.readFileSync('/etc/letsencrypt/live/knowledge-space.org/fullchain.pem');

// https.createServer({
//   key: privateKey,
//   cert: certificate
// }, app).listen(5000, () => {
//   console.debug("listening")
// });
