import React, {Component} from 'react'
import {connect} from 'react-redux'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import {fade} from '@material-ui/core/styles/colorManipulator'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Autosuggest from 'features/autosuggest/Autosuggest'

import hbp from 'imgs/hbp-logo.png';
import nif from 'imgs/nif-logo.png';
import incf from 'imgs/incf-logo.svg';

import ebrains from 'imgs/partners/ebrains.png';
import brainmaps from 'imgs/partners/brainmaps.png';
import neuromorpho from 'imgs/partners/neuromorpho.png';
import opensourcebrain from 'imgs/partners/opensourcebrain.png';
import icg from 'imgs/partners/icg.png';
import pubmed from 'imgs/partners/pubmed.png';
import neurolex from 'imgs/partners/neurolex.png';
import modeldb from 'imgs/partners/modeldb.png';
import gensat from 'imgs/partners/gensat.png';
import neurondb from 'imgs/partners/neurondb.png';
import neuroelectro from 'imgs/partners/neuroelectro.png';
import bbp from 'imgs/partners/bbp.png';
import cli from 'imgs/partners/cli.png';
import allen from 'imgs/partners/allen.png';

const partner_logos = [
  { href: 'http://portal.brain-map.org/',
    name: 'Allen Brain Map',
    src: allen  },
  { href:'http://neuromorpho.org/',
    name: 'Neuromorpho',
    src: neuromorpho },
  { href: 'http://www.opensourcebrain.org/',
    name:'Open Source Brain',
    src: opensourcebrain },
  { href: 'https://icg.neurotheory.ox.ac.uk/',
    name:'IonChannelGenealogy',
    src: icg },
  { href: 'https://www.ncbi.nlm.nih.gov/pubmed',
    name: 'PubMed',
    src: pubmed },
  { href:'http://neurolex.org',
    name: 'NeuroLex',
    src: neurolex },
  { href: 'https://senselab.med.yale.edu/ModelDB/',
    name: 'ModelDB',
    src: modeldb },
  { href: 'http://www.gensat.org/daily_showcase.jsp',
    name: 'GENSAT',
    src: gensat },
  { href: 'https://senselab.med.yale.edu/neurondb',
    name: 'NeuronDB',
    src: neurondb },
  { href: 'https://neuroelectro.org/',
    name: 'NeuroElectro',
    src: neuroelectro },
  { href: 'https://bluebrain.epfl.ch/',
    name: 'Blue Brain Project',
    src: bbp },
  { href: 'http://cellimagelibrary.org/',
    name: 'Cell Image Library',
    src: cli },
  { href: 'http://brainmap.org/',
    name: 'BrainMaps',
    src: brainmaps },
    { href: 'https://ebrains.eu/',
    name: 'EBRAINS',
    src: ebrains }
];

const sortLogos = (logos) => {
  return logos.sort((c1, c2) => {
    return c1.name.toLowerCase() > c2.name.toLowerCase() ? 1 : -1;
  });
}

const logos = sortLogos(partner_logos);


const styles = theme => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      fontSize: theme.typography.h4.fontSize,
    },
  },
  inputRoot: {},
  inputInput: {
    fontSize: theme.typography.h5.fontSize,
    paddingLeft: '10px'
  },
  searchContainer: {
    margin: '20px 0'
  },
  searchIcon: {
    fontSize: theme.typography.h4.fontSize,
    width: '72px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  suggestBox: {
    zIndex: 1,
    marginTop: theme.spacing.unit,
    zIndex: 1
  },
  search: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    '&:hover': {
      boxShadow: theme.shadows[5],
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: '100%'
  },
  logoContainer: { 
    marginTop: '125px', 
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px'
    }
   },
  logo: {
    margin: '25px',
    minWidth: 100
  },
  dataSourcesLogoContainer: { 
    marginTop: '125px', 
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
   },
  dataSources: { 
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    marginTop: 50
   },
  dataSourceLogo: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  imgFullHeight: {
    left: 'auto',
    height: 50,
    width: 149,
    position: 'static',
    transform: 'none'
  },
  gridListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    scrollBehavior: 'smooth'
  },
  tile: {
    width: 149 
  },
  tileTitle: {
    wordBreak: 'break-word',
    overflow: 'unset',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.button.fontSize,
    },
    color: theme.palette.common.black,
    '&:hover': { cursor: 'pointer' }
  },
  tileBar: {
    backgroundColor: '#e0e0e0'
  }
});

class HomePageOld extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props

    const iconScrollerLeft = ({target}) => {
      const list = document.getElementById('scrollBar').querySelector('ul'); 
      list.scrollLeft -= 600;
    }
    
    const iconScrollerRight = ({target}) => {
      const list = document.getElementById('scrollBar').querySelector('ul'); 
      list.scrollLeft += 600;
    }

    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom className={classes.title}>KnowledgeSpace</Typography>
          <Typography variant="subtitle1" gutterBottom>A community encyclopedia linking brain research concepts to data, models, and literature.</Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.searchContainer}>
            <Autosuggest classes={classes} history={this.props.history}/>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1" gutterBottom>Over 1678580 pieces of data collected from 14 sources.</Typography> 
        </Grid>
        <Grid item xs={12} sm={12} classes={{item: classes.logoContainer }}>
          <Grid container direction="row" alignItems='center' justify="flex-start" classes={{container: classes.partners}}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>Partners</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="space-between">
            <Grid item sm={4} xs={12}>
              <a href='https://humanbrainproject.eu/'>
                <img alt='HBP' className={classes.logo} src={hbp}  />
              </a>
            </Grid>
            <Grid item sm={4} xs={12}>
              <a href='https://www.neuinfo.org'>
                <img alt='NIF' className={classes.logo} src={nif}  />
              </a>
            </Grid>
            <Grid item sm={4} xs={12}>
              <a href='https://www.incf.org'> 
                <img alt='INCF' className={classes.logo} src={incf}  />
              </a>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="flex-start" classes={{container: classes.dataSources}}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>Data Sources</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems='center' justify="flex-start" classes={{container: classes.dataSources}}>
              <Grid item xs={1}>
                <Fab  aria-label="Left" className={classes.fab} onClick={iconScrollerLeft}>
                  <ChevronLeftIcon />
                </Fab>
              </Grid>
              <Grid item xs={10}>
                <div id='scrollBar'>
                  <GridList cellHeight={100} className={classes.gridList} cols={(logos.length / 3)}>
                    { logos.map( logo => (
                       <GridListTile classes={{root: classes.tile, 
                                               imgFullHeight: classes.imgFullHeight,
                                               imgFullWidth: classes.imgFullHeight }} 
                                               key={logo.src}
                                               onClick={ () => window.open(logo.href) } >
                        <img alt={logo.name}  src={logo.src} className={classes.dataSourceLogo}  />
                        <GridListTileBar title={logo.name} classes={{root: classes.tileBar, title: classes.tileTitle}} />
                       </GridListTile> 
                      ))
                    }
                  </GridList>
                </div>
              </Grid>
              <Grid item xs={1}>
                <Fab aria-label="ScrollRight" className={classes.fab} onClick={iconScrollerRight}>
                  <ChevronRightIcon />
                </Fab>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = ({entitySearch}) => {
  return {...entitySearch}
}

export default withStyles(styles)(connect(mapStateToProps)(HomePageOld))
