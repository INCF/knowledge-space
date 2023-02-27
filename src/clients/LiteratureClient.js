import { toString, omitBy, isEmpty, has, map, flatten, merge } from "lodash";
import { API_END_POINT } from "./ESClient";
import axios from "axios";
const LITERATURE_RESULTS_PER_PAGE = 25;

const aggsParams = () => ({
  aggs: {
    pub_type: {
      terms: {
        field: "pub_type.keyword",
      },
    },
    "journal.title": {
      terms: {
        field: "journal.title.keyword",
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

export const queryLiteratureByCuriePaths = ({
  curie_paths,
  page = 1,
  q,
  filters = {},
}) => {
  // Start with the aggs we alway use.
  const body = aggsParams();
  body.query = { bool: {} };
  // Now set pagination
  const start = (Number(page) - 1) * LITERATURE_RESULTS_PER_PAGE;
  body.from = start;
  body.size = LITERATURE_RESULTS_PER_PAGE;

  body.sort = [{ pub_date: { order: "desc" } }];
  body.track_total_hits = true;

  // In literature, we should be able to filter using the Entity's path.
  if (!isEmpty(curie_paths)) {
    body.query.bool = {
      must: [
        {
          terms: {
            "text_mined_entities.nlp.tagged_entities_grouped.NEURO|SCICRUNCH.reference.keyword": curie_paths,
          },
        },
      ],
    };
  }

  // Add a query if there's a q param
  if (!isEmpty(toString(q))) {
    if (!body.query.bool.must) {
      body.query.bool.must = [];
    }
    body.query.bool.must.push(queryBuilder(q));
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
    .get(API_END_POINT + "entity/literature-by-curie-paths", {
      params: { body },
    })
    .then((res) => {
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
