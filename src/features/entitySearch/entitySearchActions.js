import {ENTITY_SEARCH_INITIALIZED,
  ENTITY_SEARCH_SUBMITTED,
  ENTITY_SEARCH_RESULTS_RECEIVED,
  ENTITY_SEARCH_PAGINATED} from './entitySearchConstants'

export const initializeSearch = () => ({
  type: ENTITY_SEARCH_INITIALIZED
})

export const paginateSearch = query => ({
  type: ENTITY_SEARCH_PAGINATED,
  query
})

export const submitSearch = query => ({
  type: ENTITY_SEARCH_SUBMITTED,
  query
})

export const updateResults = results => ({
  type: ENTITY_SEARCH_RESULTS_RECEIVED,
  results
})
