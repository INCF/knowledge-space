import {createReducer} from 'common/utils/reducerUtils'
import {mapValues, concat} from 'lodash'
import {TRAININGSPACE_SEARCH_SUBMITTED, TRAININGSPACE_RESULTS_FOUND, TRAININGSPACE_SEARCH_RESULTS_PAGINATED} from './trainingSpaceConstants'

const initialState = {
  results: {hits: []},
  facets: {},
  filters: {},
  page: 1,
  showProgress: true
}

export function updateTrainingSpaceSearch(state= {}, payload ) {
  return { ...state, showProgress: true }
}

export function loadTrainingSpace(state = {}, payload) {
  const {page, results, filters, facets} = payload
  state.results = results
  state.filters = mapValues(filters, v => new Set(v))
  state.page = page || 1
  state.facets = facets
  return {...state, showProgress: false}
}

export function appendResults(state = {}, payload) {
  const hits = concat(state.results.hits, payload.results.hits)
  state.results.hits = hits
  state.page = payload.page
  return {...state}
}

export default createReducer(initialState, {
  [TRAININGSPACE_SEARCH_SUBMITTED]: updateTrainingSpaceSearch,
  [TRAININGSPACE_RESULTS_FOUND]: loadTrainingSpace,
  [TRAININGSPACE_SEARCH_RESULTS_PAGINATED]: appendResults
})
