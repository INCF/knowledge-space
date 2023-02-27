import { toString, omitBy, isEmpty, has, map, flatten, merge, head } from "lodash";
import { API_END_POINT } from "./ESClient";
import axios from "axios";
const TRAININGSPACE_RESULTS_PER_PAGE = 25;

const aggsParams = () => ({
  aggs: {
    Topics: {
      terms: {
        field: "Topics.keyword",
      },
    },
    "DifficultyLevel": {
      terms: {
        field: "DifficultyLevel.keyword",
      },
    },
  },
});
// Pass a string that gets added to an ES query
const queryBuilder = (query) => {
  return {
    multi_match: {
      query,
      fields: ["keywords^10", "title^10", "authors.full_name^8", "abstract"],
    },
  };
};

const queryString = (labels) => {
  if (labels.length > 1) {
    return labels.map((label) => `(${label})`).join(" OR ");
  } else {
    return head(labels);
  }
};

export const queryTrainingSpaceByCuriePaths = ({
  curie_paths,
  page = 1,
  q,
  filters = {},
}) => {
  console.debug("coming in training space client")
  // Start with the aggs we alway use.
  const body = aggsParams();
  body.query = { bool: {} };
  // Now set pagination
  const start = (Number(page) - 1) * TRAININGSPACE_RESULTS_PER_PAGE;
  body.from = start;
  body.size = TRAININGSPACE_RESULTS_PER_PAGE;

  // body.sort = [{ pub_date: { order: "desc" } }];
  body.track_total_hits = true;

  // In literature, we should be able to filter using the Entity's path.


   // console.debug(index);
   const labels = [q];
   const query = queryString(labels);


  // Add a query if there's a q param
  if (!isEmpty(toString(q))) {
    
    body.query.bool.must =  { query_string: { query } }
  }

  const filterBuilder = (filters) => {
    return flatten(
      Object.keys(filters).map((key) => {
        return map([...filters[key]], (val) => {
          return { term: { [key + ".keyword"]: val } };
        });
      })
    );
  };

  const queryFilters = omitBy(filters, isEmpty);
  if (!isEmpty(queryFilters)) {
    body.query.bool.filter = filterBuilder(queryFilters);
  }

  return axios
    .get(API_END_POINT + "entity/training-space-by-curie-paths", {
      params: { body },
    })
    .then((res) => {
      console.debug("check error response")
      console.debug(res)
      const response = res.data;
      return {
        results: response.hits,
        facets: response.aggregations,
        page,
        q,
        filters,
      };
    });
};
