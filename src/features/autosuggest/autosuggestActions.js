import {
  AUTOSUGGEST_SUBMITTED,
  AUTOSUGGEST_RESULTS_RECEIVED } from './autosuggestConstants'


export const submitAutosuggest = query => ({
  type: AUTOSUGGEST_SUBMITTED,
  query
})

export const updateResults = results => ({
  type: AUTOSUGGEST_RESULTS_RECEIVED,
  results
})
