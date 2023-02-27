import { findBySlug } from "clients/EntityClient";
import { querySourceByEntity, queryDataSourceByFreeText } from "clients/DataSpaceClient";

import { ENTITY_FOUND } from "../entity/entityConstants";
import {
  DS_ENTITY_FOUND,
  DS_RESULTS_FOUND,
  DS_SEARCH_RESULTS_PAGINATED,
  DS_FREE_TEXT_RESULTS_FOUND,
} from "./dataSpaceConstants";
import { put, call } from "redux-saga/effects";

export function* updateEntityAndSearchDS({ payload }) {
  try {
    const { slug, source } = payload;
    const entity = yield call(findBySlug, slug);
    const labels  = {entity};
   
    yield put({ type: ENTITY_FOUND, payload:slug});
    yield put({ type: DS_ENTITY_FOUND, payload: { entity, slug, source } });
  } catch (err) {
    yield put({ type: "DATASPACE_ERROR", err });
  }
}

export function* searchDSByEntity({ payload }) {
  try {
    const { entity, source, slug, filters, page } = payload;
    const results = yield call(querySourceByEntity, {
      entity,
      source,
      filters,
      slug,
      page,
    });
    yield put({ type: DS_RESULTS_FOUND, payload: results });
  } catch (err) {
    yield put({ type: "DATASPACE_ERROR", err });
  }
}

export function* searchDSByFreeText({ payload }) {
  try {
    const { slug, filters, page, facets } = payload;
    const results = yield call(queryDataSourceByFreeText, {
      freeText: slug,
      filters,
      page,
      facets,
    });
    yield put({ type: DS_FREE_TEXT_RESULTS_FOUND, payload: results });
  } catch (err) {
    yield put({ type: "DATASPACE_ERROR", err });
  }
}

export function* paginateDSSearch({ payload }) {
  try {
    const { entity, source, filters, page } = payload;
    const results = yield call(querySourceByEntity, {
      entity,
      source,
      filters,
      page,
    });
    yield put({ type: DS_SEARCH_RESULTS_PAGINATED, payload: results });
  } catch (err) {
    yield put({ type: "ENTITY_SEARCH_LOAD_ERROR", err });
  }
}
