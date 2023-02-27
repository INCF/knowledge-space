import {search} from 'clients/AutosuggestClient'
import {AUTOSUGGEST_RESULTS_RECEIVED} from './autosuggestConstants'
import {put, call} from 'redux-saga/effects'

export function * submitAutosuggest({query}) {
  try {
    const results = yield call(search, query);
    yield put({type: AUTOSUGGEST_RESULTS_RECEIVED, payload: results});
  } catch (err) {
    yield put({type: 'AUTOSUGGEST_LOAD_ERROR', err});
  }
}
