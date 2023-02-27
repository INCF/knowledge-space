import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {keys, isEmpty, isString, isArray, join, get} from 'lodash'

import LinesEllipsis from 'react-lines-ellipsis'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const styles = theme => {
  return (
    {
      secondary: {
        overflow: 'hidden'
      }
    }
  )
}

const titleAndAuthors = ({title, authors = [], link}) => (
  <React.Fragment>
    <Typography variant="h5" color="inherit"><a target='_blank' href={link}>{title}</a></Typography>
    <Typography variant="subtitle2" color="inherit">
      { (authors || []).map(a => `${a.LastName} ${a.Initials}`).join(', ')}
    </Typography>
  </React.Fragment>
)

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const journalAndYear = ({pub_type = [], journal = {}, journal_reference = {}, pub_date = '', abstract = '', pub_id = ''}) => {
  const {title} = journal
  const types = pub_type.filter(pt => pt != 'Journal Article')
  const {pgn, volume} = journal_reference

  const date = pub_date.split('-')
  const year = date[0]
  const month = months[date[1]]

  return (
    <Typography variant="subtitle1" color="textPrimary">
      {types.join('·')} in <i>{title}</i> {volume}:{pgn} · {month} {year} · Source: PubMed (PMID:{pub_id})
    </Typography>
  )
}

const LiteratureResult = ({classes, result, disableGutters = true}) => {
  const {authors, journal, journal_reference, title, abstract, pub_type, pub_date, pub_id} = result
  const link = `https://www.ncbi.nlm.nih.gov/pubmed/${pub_id}`

  const primary = titleAndAuthors({title, authors, link})
  const sub = journalAndYear({pub_type, journal, journal_reference, pub_date, abstract, pub_id})

  return (
    <ListItem alignItems="flex-start" disableGutters={disableGutters}>
      <ListItemText
        classes={{secondary: classes.secondary}}
        primary={
          <React.Fragment>
            {primary}
            {sub}
          </React.Fragment>}
        secondary={
          <React.Fragment>
            <LinesEllipsis
              text={abstract || ''}
              maxLine="2"
              ellipsis="..."
              component="em"
              basedOn="words"
            />
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default withStyles(styles)(LiteratureResult)
