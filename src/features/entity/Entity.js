import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import classnames from 'classnames';


import { updateSlug } from './entityActions';
import { isArray, keys, isUndefined, head, has, isEmpty, find } from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ReactMarkdown from 'react-markdown';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';

import DataSpaceAggs from '../dataSpaceAggs/DataSpaceAggs';
import Literature from '../literature/Literature';

import Relationships from './components/Relationships';

const styles = theme => ({
  titleRoot: {
    padding: 0
  },
  title: {
    ...theme.typography.h3
  },
  cardContent: {
    paddingLeft: 0,
    paddingBottom: 0
  },
  description: {
    padding: '25px 25px 25px 50px',
    overflow: 'hidden',
    textAlign: 'justify'
  },
  // descriptionText: {
  //   fontSize: theme.typography.pxToRem(theme.typography.fontSize),
  // },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
    margin: theme.spacing.unit,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    textAlign: 'center',
    display: 'block',
    paddingTop: 0
  },
  fullWidth: {
    width: '100%'
  },
  sourceLink: {
  },
  expandHeaders: {
    margin: '25px 0 15px 0'
  }
});


class Entity extends Component {

  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  updateUrlIfApplicable = () => {
    const { slug, entity } = this.props;
    const { definitions } = entity;
    if (definitions && definitions.length && definitions[0].curie) {
      console.debug(definitions);
      const fullUrl = window.location.href.split('/');
      const lastSection = fullUrl.pop() || fullUrl.pop();
      // check if url is already updated
      const splittedSection = lastSection.split("#");
      if (splittedSection && splittedSection.length && splittedSection[0] && splittedSection[1]) {
        splittedSection[1] = slug;  // we already have the updated url
      } else {
        const updatedLastSection = definitions[0].curie + "#" + slug;
        fullUrl.push(updatedLastSection);
        const newUrl = fullUrl.join("/");
        window.history.replaceState({}, "", decodeURIComponent(newUrl));
      }
    }
  }


  // since we are changing url from /t/slug to /t/curie#slug we need to identify correct slug
  splitSlugFromUrlIfApplicable = (slug) => {
    const splittedSection = slug.split("#");
    console.debug("splitSlugFromUrlIfApplicable");
    console.debug(splittedSection);
    if (splittedSection && splittedSection.length && splittedSection[1]) {
      return splittedSection[1];
    } else {
      return slug;
    }
  }

  componentDidMount() {
    const { slug } = this.props;
    console.debug("check property");
    console.debug(this.props);
    this.props.dispatch(updateSlug(this.splitSlugFromUrlIfApplicable(slug)));
  }

  componentDidUpdate() {
    this.updateUrlIfApplicable();
  }

  renderSynonyms(synonyms, classes) {
    if (isEmpty(synonyms)) { return null }
    return (
      <div>
        <Typography variant='h6' classes={{ root: classes.expandHeaders }} >Synonyms:
          {synonyms.map(syn => <Chip key={syn} label={syn} />)}
        </Typography>
      </div>
    )
  }

  render() {
    const { entity, classes } = this.props;
    const { definitions, synonyms, name, summary, linked_path, curies } = entity;

    return (
      <Grid container direction='row' justify='flex-start' alignItems='flex-start' spacing={16}>
        <Grid item xs={12} sm={8}>
          <Grid container direction='column' justify='flex-start' alignItems='flex-start' spacing={16}>
            <Grid item classes={{ item: classes.fullWidth }}>
              <Card classes={{ root: classes.description }}>
                <CardHeader title={name} classes={{ root: classes.titleRoot, title: classes.title }} />
                <Divider />
                <CardContent classes={{ root: classes.cardContent }}>
                  <Typography variant="subtitle1" color="textSecondary">
                    <Breadcrumbs aria-label="Breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                      {isArray(linked_path) && linked_path.map((link, i) => {
                        if (linked_path.length == i + 1) {
                          return (<Link key={i} color='textPrimary' aria-current='page' href={`/wiki/#${link.slug}`}>{link.label}</Link>)
                        } else {
                          return (<Link key={i} color='inherit' href={`/wiki/#${link.slug}`}>{link.label}</Link>)
                        }
                      })
                      }
                    </Breadcrumbs>
                  </Typography>
                  {this.renderSynonyms(synonyms, classes)}
                  <Typography variant='body1' paragraph={true} component='div' classes={{ root: classes.descriptionText }} >
                    <ReactMarkdown source={summary} disallowedTypes={['code']} />
                  </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                  <Fab color="primary"
                    onClick={this.handleExpandClick}
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more">
                    <ExpandMoreIcon />
                  </Fab>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <Typography variant="h5" color="textSecondary">Defined By:</Typography>
                  <List component="nav">
                    {isArray(definitions) && definitions.map((definition, i) => {
                      return (<ListItem key={i} component='div'><a href={definition.iri} target='_blank'>{definition.curie}</a></ListItem>)
                    })
                    }
                  </List>
                </Collapse>
              </Card>
            </Grid>
            <Grid item classes={{ item: classes.fullWidth }}>
              <Card>
                <Literature />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid item>
            <DataSpaceAggs />
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = ({ entity }, ownProps) => {
  const { slug } = ownProps;
  return { entity, slug }
}

export default withStyles(styles)(connect(mapStateToProps)(Entity));
