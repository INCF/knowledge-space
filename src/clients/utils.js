import {toString, omitBy, isUndefined, isEmpty, has, map, flatten, find} from 'lodash'

// Pass an object { category: Set([ 'cells' ]) }
export const filterBuilder = filters => {
  return flatten(Object.keys(filters).map(key => {
    return map([...filters[key]], val => {
      return {term: {[key]: val}}
    })
  }))
}

// We need to make sure that Aggs have entries for the filters. Why?
// ES returns nothing for an agg even if there's a filter that being used.
// For example. a user filters on a facet. Then adds to the q search, which
// returns 0 results. The agg will be empty for that filter, so we need to make
// sure that the JSON returned has that filter so it will be apparent they're
// still filtering...
export const combineAggsAndFilters = (aggs, filters) => {
  if (isEmpty(filters)) {
    return aggs
  }
  Object.keys(aggs).forEach(key => {
    if (has(filters, key)) {
      const filter = filters[key]
      const buckets = new Set(aggs[key].buckets.map(b => b.key));
      [...filter].filter(f => !buckets.has(f)).forEach(f => {
        aggs[key].buckets.push({key: f, doc_count: 0})
      })
    }
  })
  return aggs
}
