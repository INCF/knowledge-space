import { toString, omitBy, isEmpty, has, map, flatten } from 'lodash'
import { esclient, API_END_POINT } from './ESClient'
import { filterBuilder, combineAggsAndFilters } from './utils'
import axios from 'axios';


export const search = ({ q = '', source = '' }) => {
  console.debug("coming in auto suggest");
  const body = {
    'suggest': {
      'suggestions': {
        'prefix': q,
        'completion': {
          'field': 'suggestions',
          'skip_duplicates': true
        }
      }
    }
  }

  console.debug(API_END_POINT);
  return axios.get(API_END_POINT + 'entity/auto-suggest', { params: {index:source, body } }).then(res => {
    const response = res.data;
    const suggestions = flatten(response.suggest.suggestions.map(suggestion => {
      return suggestion.options.map(o => ({ name: o.text, slug: o._id }))
    }));
    return { q, suggestions }
  });
}
