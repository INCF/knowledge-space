import {
  toString,
  head,
  isNull,
  omitBy,
  isEmpty,
  isArray,
  has,
  keys,
  map,
  flatten,
} from "lodash";
import { DATASPACE_SOURCES } from "features/dataSpace/dataSpaceConstants";
import { API_END_POINT } from "./ESClient";
import { filterBuilder } from "./utils";
import axios from "axios";
const queryString = (labels) => {
  if (labels.length > 1) {
    return labels.map((label) => `(${label})`).join(" OR ");
  } else {
    return head(labels);
  }
};

export const queryAllByEntity = ({ labels }) => {
  if (isNull(labels)) {
    return {};
  }

  return axios
    .get(API_END_POINT + "entity/all-data-by-entity", { params: { labels } })
    .then((res) => {
      const response = res.data;
      console.debug("check all data");
      console.debug(response);
      return response.aggregations.sources.buckets;
    });
};

const aggParameters = (fields) => {
  const aggs = {};
  Object.keys(fields).forEach((field) => {
    aggs[field] = { terms: { field } };
  });
  return aggs;
};

export const querySourceByEntity = ({
  source,
  entity,
  page = 0,
  slug = "",
  filters = {},
}) => {

 let labels = null;
 
 if(entity) {
  labels = entity.labels 
 }
 
 // if entity(Specific term) not found from entered search then make labels from free text so that data source page still workd as free text search inside indexes 
  if(!labels){
    labels = [slug];
  }  
  // If no entity found and no text present to search then return empty 
  if (!labels) {
    return {};
  }
  const aggs = aggParameters(DATASPACE_SOURCES[source].aggs);
  const query = queryString(labels);
 
  const body = {
    aggs,
    query: {
      bool: {
        must: { query_string: { query } },
      },
    },
  };
  const filterFields = omitBy(filters, isEmpty);
  if (!isEmpty(filterFields)) {
    body.query.bool.filter = filterBuilder(filterFields);
  }

  // Now set pagination
  body.size = 25;
  body.from = page * 25;
  return axios
    .get(API_END_POINT + "entity/source-data-by-entity", {
      params: { body, source },
    })
    .then((res) => {
      const response = res.data;
      return {
        results: response.hits,
        facets: response.aggregations,
        total_count: response.total_count,
        page,
        slug,
        filters,
      };
    });
  // return request
};

export const queryDataSourceByFreeText = ({
  freeText,
  page = 0,
  q = "",
  filters = {},
  facets = {},
}) => {
  let index = "scr*";
  if (filters["sources"]) {
    index = [...filters["sources"]];
  }
  // console.debug(index);
  const labels = [freeText];
  const query = queryString(labels);

  if (isNull(labels)) {
    // console.debug("returnng");
    return {};
  }
  const body = {
    query: {
      bool: {
        must: { query_string: { query } },
      },
    },
  };
  // const filterFields = omitBy(filters, isEmpty);
  // if (!isEmpty(filterFields)) {
  //   body.query.bool.filter = filterBuilder(filterFields);
  // }

  // Now set pagination
  body.size = 25;
  body.from = page * 25;

  body.aggs = {
    sources: {
      terms: {
        field: "_index",
        size: 20,
      },
    },
  };
  return axios
    .get(API_END_POINT + "entity/all-data-by-free-text", {
      params: { body, index },
    })
    .then((res) => {
      const response = res.data;
      return {
        results: response.hits,
        facets: index === "scr*" ? response.aggregations : facets,
        page,
        q,
        filters,
        total_count: response.total_count
      };
    });
  // return request
};
