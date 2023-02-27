import { toString, omitBy, isEmpty, has, map, flatten, head } from 'lodash'
import { esclient, API_END_POINT } from './ESClient'
import axios from 'axios';


export const searchBrainRegion = payload => {
  console.debug('payload check');
  console.debug(payload);
  return axios.get(API_END_POINT + 'graph/get-brain-region-relations', { params: {term:payload.searchText}}).then(res => {
    const response = {};
    response.graphData = res.data;
    return response;
  }).catch(exp => {
    console.error("error in get");
    console.error(exp);
  })

}
