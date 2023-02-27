import {createReducer} from 'common/utils/reducerUtils'
import {ENTITY_UPDATE,
  ENTITY_FOUND,
  ENTITY_LOADED,
  ENTITY_DATASPACE_RESULTS_FOUND} from './entityConstants'

const initialState = {}

export function updateEntity(state = {}, payload) {
  return {slug: payload}
}

export function loadEntity(state = {}, payload) {
  return {...state, ...payload}
}

export function loadDataSpace(state = {}, payload) {
  return {...state}
}

export function postEntityLoad(payload) {
  return {...payload}
}

export default createReducer(initialState, {
  [ENTITY_UPDATE]: updateEntity,
  [ENTITY_FOUND]: loadEntity,
  [ENTITY_DATASPACE_RESULTS_FOUND]: loadDataSpace
})
