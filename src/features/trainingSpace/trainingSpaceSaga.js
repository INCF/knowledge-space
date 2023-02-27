import {queryTrainingSpaceByCuriePaths} from 'clients/TrainingSpaceClient'

import {TRAININGSPACE_SEARCH,
  TRAININGSPACE_RESULTS_FOUND,
  TRAININGSPACE_SEARCH_RESULTS_PAGINATED} from './trainingSpaceConstants'
import {put, call} from 'redux-saga/effects'

export function * searchTrainingSpaceByPath({payload}) {
  try {
    const {curie_paths} = payload;
    const results = yield call(queryTrainingSpaceByCuriePaths, {curie_paths})
    yield put({type: TRAININGSPACE_RESULTS_FOUND, payload: results})
  } catch (err) {
    yield put({type: 'TRAININGSPACE_ERROR', err})
  }
}

export function * searchTrainingSpace({payload}) {
  try {
    console.debug("searching training space saga")
    const results = yield call(queryTrainingSpaceByCuriePaths, {...payload})

    yield put({type: TRAININGSPACE_RESULTS_FOUND, payload: results})
  } catch (err) {
    console.debug("searching training space saga err")
    yield put({type: 'TRAININGSPACE_ERROR', err})
  }
}

export function * paginateTrainingSpace({payload}) {
  try {
    const results = yield call(queryTrainingSpaceByCuriePaths, {...payload})
    yield put({type: TRAININGSPACE_SEARCH_RESULTS_PAGINATED, payload: results})
  } catch (err) {
    yield put({type: 'TRAININGSPACE_ERROR', err})
  }
}
