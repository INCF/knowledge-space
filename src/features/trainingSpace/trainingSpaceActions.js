import {TRAININGSPACE_SEARCH_SUBMITTED,
  TRAININGSPACE_RESULTS_FOUND,
  TRAININGSPACE_SEARCH_PAGINATED} from './trainingSpaceConstants'

export const paginateSearch = query => ({
  type: TRAININGSPACE_SEARCH_PAGINATED,
  payload: query
})

export const submitSearch = query => ({
  type: TRAININGSPACE_SEARCH_SUBMITTED,
  payload: query
})
