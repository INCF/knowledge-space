import {createReducer} from 'common/utils/reducerUtils'
import {concat} from 'lodash'
import {
  AUTOSUGGEST_SUBMITTED,
  AUTOSUGGEST_RESULTS_RECEIVED } from './autosuggestConstants'

const initialState = { q: '', suggestions: [] }

export function startSearch() {
  return initialState
}

export function submitSearch(state = {}, payload) {
  return state;
}

export function loadResults(state = {}, payload) {
  return payload
}

export default createReducer(initialState, {
  [AUTOSUGGEST_SUBMITTED]: submitSearch,
  [AUTOSUGGEST_RESULTS_RECEIVED]: loadResults
})
