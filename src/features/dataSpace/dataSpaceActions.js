import {
  DS_ENTITY_UPDATE,
  DS_SEARCH_PAGINATED,
  DS_ENTITY_FOUND,
  DS_SEARCH_SUBMITTED,
  DS_FREE_TEXT_SEARCH,
} from "./dataSpaceConstants";

export const updateEntityAndSource = ({ slug, source }) => ({
  type: DS_ENTITY_UPDATE,
  payload: { slug, source },
});

export const updateDataByFreeTextDataSearch = ({
  slug,
  filters = {},
  facets = {},
}) => ({
  type: DS_FREE_TEXT_SEARCH,
  payload: { slug, filters, facets },
});

export const paginateSearch = (query) => ({
  type: DS_SEARCH_PAGINATED,
  payload: query,
});

export const submitSearch = (query) => ({
  type: DS_SEARCH_SUBMITTED,
  payload: query,
});

export const submitFreeTextSearch = (query) => ({
  type: DS_FREE_TEXT_SEARCH,
  payload: query,
});
