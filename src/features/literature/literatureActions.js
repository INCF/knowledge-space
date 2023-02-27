import {LITERATURE_SEARCH_SUBMITTED,
  LITERATURE_RESULTS_FOUND,
  LITERATURE_SEARCH_PAGINATED} from './literatureConstants'

export const paginateSearch = query => ({
  type: LITERATURE_SEARCH_PAGINATED,
  payload: query
})

export const submitSearch = query => ({
  type: LITERATURE_SEARCH_SUBMITTED,
  payload: query
})
