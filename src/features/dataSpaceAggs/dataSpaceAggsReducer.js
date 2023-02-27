import {createReducer} from 'common/utils/reducerUtils'
import {DATASPACE_AGGS_FOUND} from './dataSpaceAggsConstants'

const initialState = {}

export function loadAggs(state = {}, payload) {
  return payload
}

export default createReducer(initialState, {
  [DATASPACE_AGGS_FOUND]: loadAggs
})
