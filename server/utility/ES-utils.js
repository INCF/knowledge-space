let { map, flatten, head, isNull, reduce, has } = require("lodash");
const elasticsearch = require("elasticsearch");
const DATASPACE_SOURCES = require("./dataSpaceConstants.js");

const esDataSpaceClient = new elasticsearch.Client({
  host: process.env.REACT_APP_ES_DATASPACE_URL,
  httpAuth:
    process.env.REACT_APP_ES_DATASPACE_USER +
    ":" +
    process.env.REACT_APP_ES_DATASPACE_PASS,
});

const filterBuilder = (filters) => {
  return flatten(
    Object.keys(filters).map((key) => {
      return map([...filters[key]], (val) => {
        return { term: { [key]: val } };
      });
    })
  );
};

const queryString = (labels) => {
  if (labels && labels.length > 1) {
    return labels.map((label) => `(${label})`).join(" OR ");
  } else {
    return head(labels);
  }
};

const prepareDataSetDetails = (slug, dataSetsAggs) => {
  const aggs = reduce(
    dataSetsAggs,
    (memo, { key, doc_count }) => {
      memo[key] = doc_count;
      return memo;
    },
    {}
  );
  const aggByType = reduce(
    DATASPACE_SOURCES,
    (memo, value, key) => {
      const { type } = value;
      value.id = key;
      if (!has(memo, type)) {
        memo[type] = { sources: [], doc_count: 0 };
      }
      if (has(aggs, key)) {
        const newObj = {};
        memo[type].doc_count = memo[type].doc_count + aggs[key];
        newObj.type = value.type;
        newObj.id = value.id;
        newObj.label = value.label;
        newObj.description = value.description;
        newObj.doc_count = aggs[key];
        newObj.url =
          process.env.REACT_APP_API_END_POINT +
          "wiki/" +
          slug +
          "/dataspace/" +
          value.id;
        memo[type].sources.push(newObj);
      }
      return memo;
    },
    {}
  );
  return aggByType;
};

const esUtils = {
  getDataSpaceESClient: function () {
    return esDataSpaceClient;
  },
  findSlugByCurie: async (curie) => {
    const queryFilters = { curies: [curie] };
    const body = { query: { bool: { filter: filterBuilder(queryFilters) } } };
    return esDataSpaceClient
      .search({
        index: "scigraph",
        type: "_doc",
        body,
      })
      .then((response) => {
        const hit = head(response.hits.hits);
        return hit._id;
      })
      .catch((err) => {
        console.error("Error in finding slug by curie " + curie);
        console.error(err);
        return null;
      });
  },
  findBySlug: async (slug) => {
    return esDataSpaceClient
      .get({
        index: "scigraph",
        type: "_doc",
        id: slug,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("Error in finding entity details by slug  " + slug);
       // console.error(err);
        return [];
      });
  },
  queryAllDataSpaceByEntity: async (labels) => {
    if (isNull(labels)) {
      return {};
    }
    const query = queryString(labels);
    const body = {
      size: 25,
      query: {
        query_string: { query },
      },
      aggs: {
        sources: {
          terms: {
            field: "_index",
            size: 20,
          },
        },
      },
    };
    console.debug("check all data request");
    console.debug(JSON.stringify(body));
    return esDataSpaceClient
      .search({
        index: "scr*",
        body,
      })
      .then((response) => {
        return response;
      })
      .catch((exp) => {
        console.error("error occured in all-data-by-entity");
        // console.error(body);
        // console.error(exp);
        return [];
      });
  },
};

esUtils.getSpecificDetails = async (slugDetails, type, slug) => {
  let details = [];
  switch (type) {
    case "datasets":
      details = await esUtils.getDataSetsByEntity(slugDetails._source, slug);
      break;
    default:
      details = slugDetails._source ? slugDetails._source.summary : [];
      break;
  }
  return details;
};

esUtils.getDataSetsByEntity = async (entity, slug) => {
  try {
    const allDataSets = await esUtils.queryAllDataSpaceByEntity(entity.labels);
    const dataSetDetails = prepareDataSetDetails(
      slug,
      allDataSets.aggregations.sources.buckets
    );
    return dataSetDetails;
  } catch (exp) {
    console.error("error occured in getDataSetsByEntity");
    console.error(entity);
    console.error(exp);
    return [];
  }
};

module.exports = esUtils;
