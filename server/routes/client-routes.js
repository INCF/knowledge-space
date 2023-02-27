const app = require("express");
const router = app.Router();

const esUtils = require("../utility/ES-utils");

const esDataSpaceClient = esUtils.getDataSpaceESClient();

// autosuggest
router.get("/auto-suggest", function (req, res) {
  esDataSpaceClient
    .search({
      index: "scigraph",
      type: "_doc",
      body: req.query.body,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error("Error occured in auto suggest");
      console.error(req.query.body);
      console.error(err);
      res.send([]);
    });
});

// entity-search
router.get("/find-slug-by-curie", async function (req, res) {
  const slug = await esUtils.findSlugByCurie(req.query.curie);
  res.send(slug);
});

router.get("/find-by-slug", async function (req, res) {
  const slugDetails = await esUtils.findBySlug(req.query.id);
  res.send(slugDetails);
});

router.get("/details", function (req, res) {
  esDataSpaceClient
    .search({
      index: "scigraph",
      type: "_doc",
      body: req.query.body,
    })
    .then((response) => {
      res.send(response);
    });
});

// datasource client
router.get("/all-data-by-entity", async function (req, res) {
  const response = await esUtils.queryAllDataSpaceByEntity(req.query.labels);
  res.send(response);
});

/* this API is similar to al-data-by-entity
 * Key difference: above API fetches no data but aggregation
 */

router.get("/all-data-by-free-text", async function (req, res) {
  let esclientToUse = esDataSpaceClient;
  const index = req.query.index || "scr*";
  const handleCountResponse = (res, total_count) => {
    esclientToUse
      .search({
        index,
        body: req.query.body,
      })
      .then((response) => {
        response.total_count = total_count;
        res.send(response);
      })
      .catch((exp) => {
        console.error("error occured in source-data-by-entity");
        // console.error(req.query.body);
        console.error(exp);
        res.send([]);
      });
  }
  const query = JSON.parse(req.query.body);
  esclientToUse
    .count({
      index,
      body: {
        query: query.query
      },
    }).then((response) => {
      console.debug("check free data response")
      console.debug(response)
      handleCountResponse(res, response.count)
    }).catch((exp) => {
      console.debug("check free data exp")
      console.debug(response)
      handleCountResponse(res)
    })
});


router.get("/source-data-by-entity", function (req, res) {

  const handleCountResponse = (res, total_count) => {
    esclientToUse
      .search({
        index: req.query.source,
        body: req.query.body,
      })
      .then((response) => {
        response.total_count = total_count;
        res.send(response);
      })
      .catch((exp) => {
        console.error("error occured in source-data-by-entity");
        // console.error(req.query.body);
        console.error(exp);
        res.send([]);
      });
  }

  let esclientToUse = esDataSpaceClient;
  const query = JSON.parse(req.query.body);
  esclientToUse
    .count({
      index: req.query.source,
      body: {
        query: query.query
      },
    }).then((response) => {
      handleCountResponse(res, response.count)
    }).catch((exp) => {
      handleCountResponse(res)
    })
});

//Literature
router.get("/literature-by-curie-paths", function (req, res) {
  esDataSpaceClient
    .search({
      index: "pubmed-19",
      type: "_doc", // 'publication',
      body: req.query.body,
    })
    .then((response) => {
      res.send(response);
    });
});

//Training
router.get("/training-space-by-curie-paths", function (req, res) {
  console.debug("check query")
  console.debug(req.query)
  esDataSpaceClient
    .search({
      index: "train_scr_022036_trainingspace",
      body: req.query.body,
    })
    .then((response) => {
      console.debug("check training space response")
      console.debug(response)
      res.send(response);
    }).catch((exp) => {
      console.debug("check error in training space search")
      console.debug(exp)
    })
});

module.exports = router;
