import React, {Component} from 'react'
import LiteratureSearch from 'features/literature/LiteratureSearch'

const LiteraturePage = props => {
  const {slug} = props.match.params
  return (
    <LiteratureSearch slug={slug}/>
  )
}

export default LiteraturePage
