import {createReducer} from 'common/utils/reducerUtils'
import {concat} from 'lodash'
import {ENTITY_SEARCH_INITIALIZED,
  ENTITY_SEARCH_SUBMITTED,
  ENTITY_SEARCH_RESULTS_RECEIVED,
  ENTITY_SEARCH_PAGINATED,
  ENTITY_SEARCH_RESULTS_PAGINATED} from './entitySearchConstants'

const initialState = {
  results: {hits: []},
  facets: {},
  filters: {},
  page: 1,
}

export function startSearch() {
  return initialState
}

export function submitSearch(state = {}, payload) {
  return {...state, ...payload}
}

export function paginateSearch(state = {}, payload) {
  return {...state, ...payload}
}

export function appendResults(state = {}, payload) {
  const hits = concat(state.results.hits, payload.results.hits)
  const results = {...state, ...payload}
  results.results.hits = hits
  return results
}

export function loadResults(state = {}, payload) {
  return {...state, ...payload}
}

export default createReducer(initialState, {
  [ENTITY_SEARCH_INITIALIZED]: startSearch,
  [ENTITY_SEARCH_SUBMITTED]: submitSearch,
  [ENTITY_SEARCH_RESULTS_RECEIVED]: loadResults,
  [ENTITY_SEARCH_PAGINATED]: paginateSearch,
  [ENTITY_SEARCH_RESULTS_PAGINATED]: appendResults
})
