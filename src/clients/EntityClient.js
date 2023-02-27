import { toString, omitBy, isEmpty, has, map, flatten, head } from 'lodash'
import { esclient, API_END_POINT } from './ESClient'
import { filterBuilder, combineAggsAndFilters } from './utils'
import axios from 'axios';

const ENTITY_RESULTS_PER_PAGE = 25

export const findSlugByCurie = curie => {
  if (typeof curie === 'undefined') {
    return null;
  }

  return axios.get(API_END_POINT + 'entity/find-slug-by-curie', { params: { curie } }).then(res => {
    const response = res.data;
    return response;
  });

}

export const findCurieByExternalId = external_id => {
  if (typeof external_id === 'undefined') {
    return null;
  }
  return axios.get(API_END_POINT + 'graph/get-by-reference-id', { params: { external_id } }).then(res => {
    const response = res.data;
    if (response && response.length) {
      if (response[0] && response[0]._fields) {
        return response[0]._fields[0]; // for curie
      }
    }
    return null;
  });

}

export const findDetailsByExternalId = (external_id, type) => {
  if (typeof external_id === 'undefined') {
    return null;
  }
  return axios.get(API_END_POINT + 'graph/get-all-by-reference-id', { params: { external_id, type } }).then(res => {
    const response = res.data;
    return response;
  });

}


export const findBySlug = slug => {
  if (typeof slug === 'undefined') {
    return {}
  }

  return axios.get(API_END_POINT + 'entity/find-by-slug', { params: { id: slug } }).then(res => {
    const response = res.data;
    return response._source
  });
}

const aggsParams = () => (
  {
    aggs: {
      category: {
        terms: {
          field: 'category.keyword'
        }
      }
    }
  }
)

// Pass a string that gets added to an ES query
const queryBuilder = query => {
  return (
    {
      bool: {
        must: {
          multi_match: {
            query,
            fields: ['title^99', 'labels^10', 'definitions.text', 'synonyms^8', 'abbreviations^8']
          }
        },
      }
    }
  )
}

export const search = ({ page = 1, q = '', filters = {} }) => {
  // Start with the aggs we alway use.
  const body = aggsParams()

  // Now set pagination
  const start = (Number(page) - 1) * ENTITY_RESULTS_PER_PAGE
  body.from = start
  body.size = ENTITY_RESULTS_PER_PAGE

  // Add a query if there's a q param
  if (!isEmpty(toString(q))) {
    body.query = queryBuilder(q)
  }

  const queryFilters = omitBy(filters, isEmpty)
  if (!isEmpty(queryFilters)) {
    if (!has(body, 'query.bool')) {
      body.query = { bool: {} }
    }
    body.query.bool.filter = filterBuilder(queryFilters)
  }
  body.track_total_hits = true;

  return axios.get(API_END_POINT + 'entity/details', { params: { body } }).then(res => {
    const response = res.data;
    return {
      results: response.hits,
      facets: combineAggsAndFilters(response.aggregations, filters),
      page,
      q,
      filters
    }
  });

}
