import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EmbedYoutube from 'features/documentation/components/EmbedYoutube.js'
import trainingSpace from "imgs/ts-logo.png";

const styles = theme => ({
  title: {
    marginBottom: '.5em',
    textAlign: 'left',
  },
  listItemParent: {
    textAlign: 'left',
    '& li': {
      padding: 5,
      fontSize: theme.typography.body1.fontSize,
    }
  },
  body: { marginBottom: '1.5em' },
  logo: {
    paddingLeft: "25px",
    paddingRight: "25px",
    marginTop: "18px",
    // minWidth: 100
    // height:'50px',
    marginBottom: "0",
  },
  readMore: {
    marginTop: "30px"
  }
})


class DocumentationPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes } = this.props
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography id="what_is_ks" variant="h4" className={classes.title}>What Is KnowledgeSpace?</Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            KnowledgeSpace aims to be a globally-used, community-based, data-driven encyclopedia for neuroscience that links brain research concepts to data, models, and the literature that support them. Further it aims to serve as a framework where large-scale neuroscience projects can expose their data to the neuroscience community-at-large. KnowledgeSpace is a framework that combines general descriptions of neuroscience concepts found in wikipedia with more detailed content from NeuroLex. It then integrates the content from those two sources with the latest neuroscience citations found in PubMed and data found in some of the world’s leading neuroscience repositories. KnowledgeSpace is a joint development between the Human Brain Project (HBP), the International Neuroinformatics Coordinating Facility (INCF), and the Neuroscience Information Framework (NIF).
          </Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            Neuroscience repositories with data currently available through KnowledgeSpace:
            Allen Institute for Brain Science,
            Blue Brain Project,
            Cell Image Library,
            Channelpedia.net,
            GENSAT,
            Human Brain Project,
            Ion Channel Genealogy,
            ModelDB,
            NeuroElectro.org,
            NeuroMorpho.org,
            NeuroLex,
            NIF Integrated Connectivity,
            Open Source Brain,
            PubMed
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography id="how_does_it_work" variant="h4" className={classes.title}>How Does It Work?</Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            KnowledgeSpace is driven by the NIF Ontology, a community built ontology that maintains an extensive set of terms and concepts important for the domains of neuroscience and biology. KnowledgeSpace uses the NIF ontology as the foundation for the index of concepts to allow for end-user search and discovery. The “DataSpace” index is populated by taking curated dataset metadata and passing it through an ETL pipeline (extract, transform, load). The ontology also serves as the basis for a Named Entity Recognition (NER)  pipeline that automatically tags Pubmed bibliographic references with KnowledgeSpace concepts
          </Typography>
          <EmbedYoutube embedId="PfdCd01cJhQ" />
          <Typography variant="h6" className={classes.readMore}>
            More lessons available in TrainingSpace
          </Typography>
          <a target="_blank" href="https://training.incf.org/lesson/knowledgespace">
            <img alt="KnowledgeSpace Tutorials" className={classes.logo} src={trainingSpace} />
          </a>
        </Grid>
        <Grid id="what_can_i_find" item xs={12} md={8}>
          <Typography variant="h4" className={classes.title}>What Can I Find?</Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            KnowledgeSpace is a place where neuroscience concepts meet Wikipedia, PubMed, and publicly available neuroscience datasets. Content in KnowledgeSpace is currently divided into 3 major categories: Brain Regions, Cell Types, and Ion Channels and further categorized according to 5 data types: Anatomy, Expression, Models, Morphology, and Physiology. For each neuroscience concept, KnowledgeSpace provides a description of the concept, the latest literature citations related to it, and a list of the datasets available in KnowledgeSpace that are related to the concept.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography id="how_do_i_navigate" variant="h4" className={classes.title}>How do I navigate KnowledgeSpace?</Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            To navigate the system, users enter the name of a neuroscience concept within the search box of the landing page (auto-completion is enabled). Users are then directed either to a search results page if there is ambiguity or to the entity page for the concept which is composed of 3 panels: Summary, DataSpace, and Literature.
          </Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            The Summary Panel provides users with a description of neuroscience concepts and links to the ontologies in which the concept is included. Concept descriptions are derived from Wikipedia and NeuroLex. From the Summary Panel, users can link-out directly to Wikipedia and NeuroLex for more content
          </Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            The DataSpace panel provides users with links to publicly available data related to the neuroscience concepts that the page is about. The data contained in the DataSpace is categorized by data types (anatomy, expression, models, morphology, physiology) and sub-categorized by source. A brief description of each source and the amount of data publicly available is also provided in this view. To Navigate within the DataSpace, users click on the repository of interest which directs users to a landing page that contains a list of all the publicly available data for the concept in question. To make it easier for users to find data, each entry  list contains additional descriptive metadata. Users can perform faceted searchers based on this metadata to further narrow the selection. Once users have found the data that they are interested in, they can click the entry to be directed to the entry’s source where they can download the data associated with the entry.
          </Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            The Literature Panel provides users with an up-to-date index of PubMed citations related to the concept in question and enables users to further specify the search results through keyword search. From the Literature Panel, users can link directly to PubMed.
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className={classes.title}>What can I do with KnowledgeSpace?</Typography>
          <div>
            <ul className={classes.listItemParent}>
              <li>Download and use data for analysis</li>
              <li>Use as a source of sample datasets for courses</li>
              <li>Expose your datasets to the world</li>
              <li>Embed KnowledgeSpace into your own website</li>
            </ul>
          </div>
          <Typography variant="body1" align='justify' className={classes.body}>

            Users are able to download and reuse the data found within KnowledgeSpace for analysis and as sample data for education.

          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className={classes.title}>Need tools?</Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            If you are looking for tools for neuroscience, please visit:
          </Typography>
          <div>
            <ul className={classes.listItemParent}>
              <li><a target="_blank" href='https://ebrains.eu/'>EBRAINS Tools and Resource</a></li>
              <li><a target="_blank" href='https://www.incf.org/resources/sbps'>INCF Network Tools and resources</a></li>
              <li><a target="_blank" href='https://www.nitrc.org/'>NeuroImaging Tools and Resources Collaboratory (NITRC)</a></li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" className={classes.title}>How do I connect my resources to KnowledgeSpace?</Typography>
          <Typography variant="body1" align='justify' className={classes.body}>
            For ontological entities, we rely on the NIF Ontology to provide definitions for terms, relationships, and assertions. To have your dataset's metadata index in KnowledgeSpace, we can provide assistance in the “extract, transform, and load” process that is needed to curate the data and improve search discoverability.
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DocumentationPage)
