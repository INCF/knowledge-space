const app = require("express");
const router = app.Router();

const esUtils = require("../utility/ES-utils");

const esDataSpaceClient = esUtils.getDataSpaceESClient();

/**
 * Helper: Safely parses req.query.body as JSON.
 * Returns parsed object on success, or sends a 400 error response and returns null.
 */
function parseQueryBody(req, res) {
  try {
    const parsed = JSON.parse(req.query.body);
    if (!parsed || typeof parsed !== "object") {
      res.status(400).send({ error: "Query body must be a non-empty JSON object" });
      return null;
    }
    return parsed;
  } catch (e) {
    res.status(400).send({ error: "Invalid query body: must be valid JSON" });
    return null;
  }
}

// autosuggest
router.get("/auto-suggest", function (req, res) {
  const body = parseQueryBody(req, res);
  if (!body) return;

  esDataSpaceClient
    .search({
      index: "scigraph",
      body,
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
  const body = parseQueryBody(req, res);
  if (!body) return;

  esDataSpaceClient
    .search({
      index: "scigraph",
      body,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error("Error occurred in details");
      console.error(err);
      res.status(500).send({ error: "Failed to fetch details" });
    });
});

// datasource client
router.get("/all-data-by-entity", async function (req, res) {
  const response = await esUtils.queryAllDataSpaceByEntity(req.query.labels);
  res.send(response);
});

/* this API is similar to all-data-by-entity
 * Key difference: above API fetches no data but aggregation
 */
router.get("/all-data-by-free-text", async function (req, res) {
  const esclientToUse = esDataSpaceClient;
  const index = req.query.index || "scr*";

  // FIX 2: Validate and parse req.query.body before use
  const query = parseQueryBody(req, res);
  if (!query) return;

  const handleCountResponse = (total_count) => {
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
        console.error("error occured in all-data-by-free-text search");
        console.error(exp);
        res.send([]);
      });
  };

  esclientToUse
    .count({
      index,
      body: {
        query: query.query,
      },
    })
    .then((response) => {
      console.debug("check free data response");
      console.debug(response);
      handleCountResponse(response.count);
    })
    .catch((exp) => {
      // FIX 1: was logging undefined `response`, now correctly logs `exp`
      console.debug("check free data exp");
      console.debug(exp);
      handleCountResponse();
    });
});

router.get("/source-data-by-entity", function (req, res) {
  // FIX 2: Validate and parse req.query.body before use
  const query = parseQueryBody(req, res);
  if (!query) return;

  const esclientToUse = esDataSpaceClient;

  // FIX: moved esclientToUse declaration above handleCountResponse to avoid temporal dead zone
  const handleCountResponse = (total_count) => {
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
        console.error(exp);
        res.send([]);
      });
  };

  esclientToUse
    .count({
      index: req.query.source,
      body: {
        query: query.query,
      },
    })
    .then((response) => {
      handleCountResponse(response.count);
    })
    .catch((exp) => {
      console.error("error occurred in source-data-by-entity count");
      console.error(exp);
      handleCountResponse();
    });
});

// Literature
router.get("/literature-by-curie-paths", function (req, res) {
  const body = parseQueryBody(req, res);
  if (!body) return;

  esDataSpaceClient
    .search({
      index: "pubmed-19",
      body,
    })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error("Error occurred in literature-by-curie-paths");
      console.error(err);
      res.status(500).send({ error: "Failed to fetch literature data" });
    });
});

// Training
router.get("/training-space-by-curie-paths", function (req, res) {
  console.debug("check query");
  console.debug(req.query);

  const body = parseQueryBody(req, res);
  if (!body) return;

  esDataSpaceClient
    .search({
      index: "train_scr_022036_trainingspace",
      body,
    })
    .then((response) => {
      console.debug("check training space response");
      console.debug(response);
      res.send(response);
    })
    .catch((exp) => {
      console.error("Error occurred in training space search");
      console.error(exp);
      res.status(500).send({ error: "Failed to fetch training space data" });
    });
});

module.exports = router;
