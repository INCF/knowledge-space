const app = require('express');
const router = app.Router();

const Neode = require('neode');
const esUtils = require('../utility/ES-utils');

// for more information about neode visit
// https://medium.com/neo4j/interacting-with-neo4j-in-nodejs-using-the-neode-object-mapper-3d99cb324546

// run a cypher
async function queryNeo4j(query, database) {
  let instance = ""
  if (database == "UBERON") {
    instance = new Neode(`${process.env.NEO4J_PROTOCOL_UBERON}://${process.env.NEO4J_HOST_UBERON}:${process.env.NEO4J_PORT_UBERON}`, process.env.NEO4J_USERNAME_UBERON, process.env.NEO4J_PASSWORD_UBERON);
  }
  if (database == "NIFSTD") {
    instance = new Neode(`${process.env.NEO4J_PROTOCOL_NIFSTD}://${process.env.NEO4J_HOST_NIFSTD}:${process.env.NEO4J_PORT_NIFSTD}`, process.env.NEO4J_USERNAME_NIFSTD, process.env.NEO4J_PASSWORD_NIFSTD);
  }

  let result = [];
  await instance.cypher(query).then(async res => {
    result = res.records;
  })
  return result;
}


router.get('/get-brain-region-relations', async function (req, res) {
  cypher_query = "WITH '" + req.query.term + "' as term " +
    'MATCH (n)-[:rdfs__subClassOf]->(p)-[:rdfs__subClassOf]->(q) ' +
    'where p.rdfs__label = term ' +
    'and n.rdfs__label is not null ' +
    'and q.rdfs__label is not null ' +
    'RETURN distinct { child: {label:n.rdfs__label, id:n.skos__notation}, term: {label:p.rdfs__label, id:p.skos__notation}, parent:{label: q.rdfs__label,id:q.skos__notation } }'
  const data = await queryNeo4j(cypher_query, "UBERON");
  res.send(data);
});


router.get('/get-paths', async function (req, res) {
  console.debug("Get root paths for a term");
  console.debug(req.query);
  cypher_query = '<<TODO>>'
  const data = await queryNeo4j(cypher_query);
  console.log("Returned data");
  console.log(data);
  res.send(data);
});


router.get('/get-by-reference-id', async function (req, res) {
  const exter_id = "'" + req.query.external_id + "'"
  const atlas = exter_id.split(":")[0]
  const id = exter_id.split(":")[1]
  const cypher_query = ' MATCH (atlas)<-[definedby:subClassOf]-(label)-[:`http://uri.interlex.org/tgbugs/uris/readable/delineates`]->(anatomy)' +
    ' WHERE toUpper(atlas.abbreviation) = ' + atlas + '\' AND split(label.iri,"/")[-1] = \'' + id + ' AND exists(atlas.abbreviation)' +
    ' RETURN anatomy.`http://www.geneontology.org/formats/oboInOwl#id` as curie, toUpper(atlas.abbreviation) + ":" + split(label.iri,"/")[-1] as search_id'

  console.log(cypher_query);
  const data = await queryNeo4j(cypher_query, "NIFSTD");
  res.send(data);
});


router.get('/get-all-by-reference-id', async function (req, res) {
  let finalData = [];
  const cypher_query = 'MATCH (n:owl__Class)-[:rdfs__subClassOf]->(p:owl__Class)' +
    "where  n.ns3__hasDbXref =  '" + req.query.external_id + "'" +
    ' return n.skos__notation as curie, n.ns3__hasDbXref as search_id'
  const data = await queryNeo4j(cypher_query, "NIFSTD");
  console.debug("data for curie");
  console.debug(data);
  if (data[0] && data[0]._fields) {
    const curie = data[0]._fields[0]; // for curie
    const slug = await esUtils.findSlugByCurie(curie);
    const slugDetails = await esUtils.findBySlug(slug);
    finalData = esUtils.getSpecificDetails(slugDetails, req.query.type);
  }
  res.send(finalData);
});

module.exports = {
  router,
  runGraphQuery: queryNeo4j
}
