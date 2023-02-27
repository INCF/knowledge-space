import React, {Component} from 'react'
import {isNull, has} from 'lodash'
import {Link} from 'react-router-dom'

import {DATASPACE_SOURCES} from '../dataSpaceConstants'
/* Dead Code ? */
const DataSpaceSourceDescription = ({source}) => {
  if (isNull(source) || !has(DATASPACE_SOURCES, source)) {
    return (null)
  }

  const {label, description} = DATASPACE_SOURCES[source]
  return (
    <span>{label} -- {description}</span>
  )
}

export default DataSpaceSourceDescription
