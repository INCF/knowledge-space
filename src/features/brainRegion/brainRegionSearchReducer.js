import {createReducer} from 'common/utils/reducerUtils'
import {concat} from 'lodash'
import {BRAIN_REGION_SEARCH_INITIALIZED,
  BRAIN_REGION_SEARCH_SUBMITTED,
  BRAIN_REGION_SEARCH_RESULTS_RECEIVED} from './brainRegionSearchConstants'

const initialState = {
  graphData :[]
}

export function startBrainRegionSearch() {
  return initialState
}

export function submitBrainRegionSearch(state = {}, payload) {
  return {...state, ...payload}
}


export function appendBrainRegionSearchResults(state = {}, payload) {
  const hits = concat(state.results.hits, payload.results.hits)
  const results = {...state, ...payload}
  results.results.hits = hits
  return results
}

export function loadBrainRegionSearchResults(state = {}, payload) {
  console.debug("set state");
  console.debug(payload);
  return {...state, ...payload}
}

export default createReducer(initialState, {
  [BRAIN_REGION_SEARCH_INITIALIZED]: startBrainRegionSearch,
  [BRAIN_REGION_SEARCH_SUBMITTED]: submitBrainRegionSearch,
  [BRAIN_REGION_SEARCH_RESULTS_RECEIVED]: loadBrainRegionSearchResults,
})
