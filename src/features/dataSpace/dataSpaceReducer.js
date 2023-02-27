import { createReducer } from "common/utils/reducerUtils";
import { mapValues, concat } from "lodash";
import {
  DS_ENTITY_UPDATE,
  DS_ENTITY_FOUND,
  DS_RESULTS_FOUND,
  DS_SEARCH_RESULTS_PAGINATED,
  DS_FREE_TEXT_RESULTS_FOUND,
} from "./dataSpaceConstants";

const initialState = {
  results: {},
  facets: {},
  filters: {},
  page: 0,
};

export function updateEntityAndSource(state = {}, { curie, source }) {
  state.source = source;
  state.curie = curie;
  return { ...state };
}

export function loadEntity(state = {}, { source }) {
  state.source = source;
  return { ...state };
}

export function loadDataSpace(state = {}, payload) {
  const { page, results, filters, facets, total_count } = payload;
  state.results = results;
  state.filters = mapValues(filters, (v) => new Set(v));
  state.page = page || 0;
  state.facets = facets;
  state.total_count = total_count;
  return { ...state };
}

export function loadDataSpaceFreeText(state = {}, payload) {
  const { page, results, filters, facets, total_count } = payload;
  state.results = results;
  state.filters = mapValues(filters, (v) => new Set(v));
  state.page = page || 0;
  state.facets = facets;
  state.total_count = total_count;
  return { ...state };
}

export function appendResults(state = {}, payload) {
  const hits = concat(state.results.hits, payload.results.hits);
  state.results.hits = hits;
  state.page = payload.page || 0;
  return { ...state };
}

export default createReducer(initialState, {
  [DS_ENTITY_UPDATE]: updateEntityAndSource,
  [DS_ENTITY_FOUND]: loadEntity,
  [DS_RESULTS_FOUND]: loadDataSpace,
  [DS_FREE_TEXT_RESULTS_FOUND]: loadDataSpaceFreeText,
  [DS_SEARCH_RESULTS_PAGINATED]: appendResults,
});
