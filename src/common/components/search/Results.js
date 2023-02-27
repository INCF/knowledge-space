import React from 'react'
import {Link} from 'react-router-dom'
import {keys, isEmpty, isString, isArray, join, get} from 'lodash'

const Results = ({hits, cols = {}, onRowClick, linkCol}) => (
  <div>
    <span>{hits.total ? hits.total.value : 0} records found</span>
    <table>
      <tbody>
        <ResultsHeader cols={cols}/>
        { hits.hits.map((hit, i) => (<ResultRow key={i.toString()} cols={keys(cols)} linkCol={linkCol} onClick={onRowClick} result={hit._source}/>))}
      </tbody>
    </table>
  </div>
)

const ResultsHeader = ({cols = {}}) => (
  <tr>
    { keys(cols).map(col => <td key={col}>{cols[col]}</td>) }
  </tr>
)

const ResultsCell = ({data}) => {
  if (isEmpty(data)) {
    return (<td/>)
  } if (isString(data)) {
    return (<td>{data}</td>)
  } if (isArray(data)) {
    return (<td>{join(data, '; ')}</td>)
  }
  return (<td/>)
}

const ResultRow = ({result, cols = [], onClick, linkCol}) => (
  <tr data-link={get(result, linkCol)} onClick={onClick}>
    { cols.map(col => <ResultsCell key={col} data={get(result, col)}/>)}
  </tr>
)

const Result = ({record}) => (
  <li><Link to={`/wiki/${record._id}`}>{record._id}</Link> : {record._source.labels[0]}</li>
)

export default Results
