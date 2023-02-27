import {BRAIN_REGION_SEARCH_INITIALIZED,
  BRAIN_REGION_SEARCH_SUBMITTED,
  BRAIN_REGION_SEARCH_RESULTS_RECEIVED} from '../brainRegion/brainRegionSearchConstants'

export const initializeBrainRegionSearch = () => ({
  type: BRAIN_REGION_SEARCH_INITIALIZED
})

export const submitBrainRegionSearch = payload => ({
  type: BRAIN_REGION_SEARCH_SUBMITTED,
  payload
})

export const updateBrainRegionSearchResults = results => ({
  type: BRAIN_REGION_SEARCH_RESULTS_RECEIVED,
  results
})
