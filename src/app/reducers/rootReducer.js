import {combineReducers} from 'redux'

import {reduceReducers} from 'common/utils/reducerUtils'

import entityReducer from 'features/entity/entityReducer'
import brainRegionSearchReducer from '../../features/brainRegion/brainRegionSearchReducer'
import entitySearchReducer from 'features/entitySearch/entitySearchReducer'
import dataSpaceAggsReducer from 'features/dataSpaceAggs/dataSpaceAggsReducer'
import dataSpaceReducer from 'features/dataSpace/dataSpaceReducer'
import literatureReducer from 'features/literature/literatureReducer'
import trainingSpaceReducer from 'features/trainingSpace/trainingSpaceReducer'
import autosuggestReducer from 'features/autosuggest/autosuggestReducer'

const combinedReducer = combineReducers({
  entity: entityReducer,
  entitySearch: entitySearchReducer,
  brainRegionSearch: brainRegionSearchReducer,
  dataSpaceAggs: dataSpaceAggsReducer,
  dataSpace: dataSpaceReducer,
  literature: literatureReducer,
  trainingSpace: trainingSpaceReducer,
  autosuggest: autosuggestReducer
})

const rootReducer = reduceReducers(
  combinedReducer
)

export default rootReducer
