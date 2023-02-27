import React, { Component } from 'react'

import Entity from 'features/entity/Entity'


const getSlugFromURLIfapplicable = (slug) => {
  const fullUrl = window.location.href.split('/');
  const lastSection = fullUrl.pop() || fullUrl.pop();
  const splittedSection = lastSection.split("#");
  if (splittedSection && splittedSection.length && splittedSection[1]) {
    return splittedSection[1]  // we already have the updated url
  }
  return slug;
}

const EntityPage = props => {
  console.debug("landed here??");
  const { slug } = props.match.params;
  const updatedSlug = getSlugFromURLIfapplicable(slug);
  console.debug("check params");
  console.debug(props.query);

  return (
    <Entity slug={updatedSlug} />
  )
}

export default EntityPage
