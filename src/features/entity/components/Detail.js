import React, {Component} from 'react'
import {isArray, keys, has} from 'lodash'

const Detail = ({entity}) => {
  const list = keys(entity)
    .filter(k => k != 'tree')
    .map(k => {
      let v = entity[k]
      if (isArray(v)) {
        v = v.join('<br />')
      }
      return (<li key={k}>{k}  :  {v}</li>)
    })
  return (<ul>{list}</ul>)
}

export default Detail
