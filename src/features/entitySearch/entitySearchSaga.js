import {search} from '../../clients/EntityClient';
import {ENTITY_SEARCH_RESULTS_RECEIVED, ENTITY_SEARCH_RESULTS_PAGINATED} from './entitySearchConstants'
import {put, call} from 'redux-saga/effects'

export function * submitSearch({query}) {
  try {
    const results = yield call(search, query);
    results.reload = false; 
    yield put({type: ENTITY_SEARCH_RESULTS_RECEIVED, payload: results});
  } catch (err) {
    yield put({type: 'ENTITY_SEARCH_LOAD_ERROR', err});
  }
}

export function * paginateSearch({query}) {
  try {
    const results = yield call(search, query)
    results.reload = false; 
    yield put({type: ENTITY_SEARCH_RESULTS_PAGINATED, payload: results})
  } catch (err) {
    yield put({type: 'ENTITY_SEARCH_LOAD_ERROR', err})
  }
}
