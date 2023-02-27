import { ENTITY_UPDATE, ENTITY_FOUND, ENTITY_LOADED } from "./entityConstants";

export const updateSlug = (slug) => ({
  type: ENTITY_UPDATE,
  slug,
});

export const loadEntity = (entity) => ({
  type: ENTITY_FOUND,
  entity,
});
