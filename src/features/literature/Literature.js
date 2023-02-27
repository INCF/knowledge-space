import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import Facets from 'common/components/search/Facets'
import {isArray, keys, isEmpty, has} from 'lodash'
import {submitSearch, paginateSearch} from './literatureActions'
import LiteratureResult from './components/LiteratureResult'

const styles = theme => ({
  description: {
    padding: '25px 25px 25px 50px',
    overflow: 'hidden',
    textAlign: 'justify'
  },
  seeMoreLink: {
    ...theme.palette.action,
    color: theme.palette.primary.main,
    marginLeft: 'auto',
    alignItems: 'center',
    textDecoration: 'none'
  },
  title: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap'
  },
  literatureSubtitle: {
    margin: 0,
    paddingLeft: 0,
    fontSize: theme.typography.h5.fontSize
  }
})

class Literature extends Component {
  handleRowClick({target}) {
    const link = 'https://www.ncbi.nlm.nih.gov/pubmed/' + target.dataset.pubid
    window.open(link, '_blank')
  }

  render() {
    const {literature, slug, classes, filters, facets, results} = this.props
    const {hits, total} = results
    return (
      <Paper className={classes.description} elevation={1}>
        <Typography variant="h3" classes={{root: classes.title}}>
          Literature
          <Link className={classes.seeMoreLink} to={`${slug}/literature`}>
            <Button size="small">See More</Button>
          </Link>
        </Typography>
        <Divider/>
        <List
          subheader={<ListSubheader component="h5" classes={{root: classes.literatureSubtitle}}>{ (total && total.value)?total.value?total.value:total:0 } results found</ListSubheader>}
        >
          { hits.slice(0, 10).map(hit => (
            <React.Fragment key={hit._id}>
              <LiteratureResult key={hit._id} result={hit._source}/>
              <Divider/>
            </React.Fragment>
          )
          )}
        </List>
      </Paper>
    )
  }
}

const mapStateToProps = ({literature, entity}) => {
  const {slug} = entity
  return {...literature, slug, entity}
}

export default withStyles(styles)(connect(mapStateToProps)(Literature))
