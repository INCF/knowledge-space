import {BRAIN_REGION_SEARCH_RESULTS_RECEIVED} from './brainRegionSearchConstants'
import {put, call} from 'redux-saga/effects'
import { searchBrainRegion } from '../../clients/BrainRegionClient';

export function * submitBrainRegionSearch(payload) {
  try {
    const results = yield call(searchBrainRegion, payload.payload);
    console.debug("response return from server get-brain-region-relations");
    console.debug(results);
    yield put({type: BRAIN_REGION_SEARCH_RESULTS_RECEIVED, payload: results});
  } catch (err) {
    yield put({type: 'BRAIN_REGION_SEARCH_LOAD_ERROR', err});
  }
}

