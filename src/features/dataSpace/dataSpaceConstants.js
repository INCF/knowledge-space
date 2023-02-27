export const DS_ENTITY_FOUND = 'DS_ENTITY_FOUND';
export const DS_ENTITY_UPDATE = 'DS_ENTITY_UPDATE';
export const DS_RESULTS_FOUND = 'DS_RESULTS_FOUND';
export const DS_FREE_TEXT_SEARCH = 'DS_FREE_TEXT_SEARCH';
export const DS_SEARCH_PAGINATED = 'DS_SEARCH_PAGINATED';
export const DS_SEARCH_SUBMITTED = 'DS_SEARCH_SUBMITTED';
export const DS_SEARCH_RESULTS_PAGINATED = 'DS_SEARCH_RESULTS_PAGINATED';
export const DS_FREE_TEXT_RESULTS_FOUND = 'DS_FREE_TEXT_RESULTS_FOUND';

export const DATASPACE_SOURCES = {
  scr_013705_neuroml_models: {//done
    label: 'NeuroML Database',
    description:
      'Curated relational database that provides for the storage and retrieval of computational neuroscience model.',
    type: 'models',
    columns: {
      'model_id': 'Model ID',
      'model_name': 'Model Name',
      'model_type': 'Model Type',
    },
    aggs: {
      'model_type.keyword': 'Model Type',
      'neurolex_terms.keyword': 'Neurolex Terms',
      'keywords.keyword': 'Keywords',
    },
  },
  scr_002145_neuromorpho_modelimage: {//Done
    label: 'NeuroMorpho',
    description: 'A curated repository of digitally reconstructed neurons.',
    type: 'morphology',
    columns: {
      'neuron_name': 'Neuron Name',
      'strain_name': 'Strain',
      'age': 'Age',
      'brain_region': 'Brain Region',
    },
    aggs: {
      'species.keyword': 'Species',
      'strain_name.keyword': 'Strain',
      'staining_method.keyword': 'Staining Method',
      'brain_region.keyword': 'Brain Region',
      'age.keyword': 'Age group',
      'gender.keyword': 'Gender',
    },
  },
  scr_007271_modeldb_models: {
    label: 'ModelDB',
    description:
      'Provides high quality computational neuroscience models. ModelDB is tightly coupled with NeuronDB.',
    type: 'models',
    columns: {
      'dc.title': 'Model Name',
      model_type: 'Model Type',
      model_concepts: 'Model Concepts',
      simulator_software: 'Software',
    },
    aggs: {
      'model_concepts.keyword': 'Model Concepts',
      'simulator_software.keyword': 'Software',
      'model_type.keyword': 'Model Type',
    },
  },
  scr_006131_hba_atlas: {
    label: 'Human Brain Atlas',
    description:
      'Contains sections stained for cell bodies or nerve fibers, as well as corresponding MRI sections through a living human brain.',
    type: 'anatomy',
    columns: {
      species: 'Species',
      brain_region: 'Brain Region',
      brain_view: 'Brain View',
    },
    aggs: {
      'species.keyword': 'Species',
      'brain_region.keyword': 'Brain Region',
      'brain_view.keyword': 'Brain View',
    },
  },
  scr_002978_aba_expression: {//Done
    label: 'Allen Brain Atlas Mouse Brain - Expression',
    description:
      'A genome_wide database of gene expression in the mouse brain.',
    type: 'expression',
    columns: { 'gene_symbol': 'Gene Symbol', 'gene_name': 'Gene Name', 'structure_name': 'Structure Name', 'expression_level': 'Expression level', 'expression_density': 'Expression density' },
    aggs: {
      'gene_name.keyword': 'Gene Name',
      'gene_symbol.keyword': 'Gene Symbol',
      'structure_name.keyword': 'Structure Name',
      'species.keyword': 'Species'
    },
  },
  scr_002978_aba_celltypeephysdata: {
    label: 'Allen Brain Atlas Mouse Brain - CellType EphysData',
    description:
      'Provides a database of neuronal cell types based on multimodal characterization of single cells to enable data_driven approaches to classification. For more details about the experiments, please refer to the technical white paper.',
    type: 'physiology',
  },
  scr_002721_gensat_geneexpression: {//Done, todo re-index
    label: 'GENSAT',
    description:
      'Contains gene expression data and maps of the mouse brain and spinal cord.',
    type: 'expression',
    columns: {
      'gene_name': 'Gene',
      'structure_name': 'Structure',
      'stain': 'Stain',
      'age': 'Age',
    },
    aggs: {
      'gene_name.keyword': 'Gene',
      'structure_name.keyword': 'Structure',
      'stain.keyword': 'Stain',
      'acquisition_technique.keyword': 'Acquisition Technique',
      'age.keyword': 'Age Group',
      'expression_level.keyword': 'Expression Level',
    },
  },
  scr_014194_icg_ionchannels: {//DONE
    label: 'IonChannelGenealogy',
    description:
      'Provides a quantitative assay of publicly available ion channel models.',
    type: 'models',
    columns: {
      'dc.title': 'Title',
      'animal_model': 'Animal Model',
      'neuron_type': 'Neuron Type',
    },
    aggs: {
      'neuron_type.keyword': 'Neuron',
      'animal_model.keyword': 'Animal Model',
      'brain_area.keyword': 'Brain Area',
      'age.keyword': 'Age group',
      'neuron_type.keyword': 'Neuron Type',
    },
  },
  scr_003105_neurondb_currents: {
    label: 'NeuronDB',
    description:
      'Provides data about neurotransmitter properties for submitted neurons.',
    type: 'physiology',
    columns: {
      neuron: 'Neuron',
      current: 'Current',
      compartment: 'Compartment',
    },
    aggs: {
      'neuron.keyword': 'Neuron',
      'current.keyword': 'Current',
      'compartment.keyword': 'Compartment',
    },
  },
  scr_006274_neuroelectro_ephys: {//To index directly
    label: 'NeuroElectro',
    description:
      'A database of elecrophysiological properties text-mined from the biomedical literature as a function of neuron type.',
    type: 'physiology',
    columns: {
      'dc.title': 'Title',
      'dc.description': 'Description',
      property_name: 'property_name',
    },
    aggs: { 'property_name.keyword': 'property_name' },
  },
  scr_003510_cil_images: {//DONE
    label: 'Cell Image Library',
    description:
      'Provides annotated images, videos and animations of cellular processes.',
    type: 'morphology',
    columns: {
      'dc.title': 'Title',
      'dc.description': 'Description',
      'biological_prcoess': 'Biological Process',
      'cell_type': 'Cell Type',
    },
    aggs: {
      'species.keyword': 'Species',
      'cell_type.keyword': 'Cell Type',
      'biological_process.keyword': 'Biological Process',
      'imaging_mode.keyword': 'Imaging Mode',
      'dimension_units.keyword': 'Dimension Units',
    },
  },
  scr_014306_bbp_cellmorphology: {//Looks okay
    label: 'Blue Brain Project Cell Morphology',
    description: '3D Models of rat neuronal morphologies.',
    type: 'morphology',
    columns: {
      'dc.title': 'Title',
      'dc.subject': 'Cell',
      region_term: 'Region',
    },
    aggs: {
      'dc.subject.keyword': 'Cell',
      'region_term.keyword': 'Region'
    },
  },
  scr_017612_ebrains: {//DONE
    label: 'EBRAINS',
    description: 'EBRAINS web platform is the entry point for researchers to discover EBRAINS services. The services were developed by, and are powered by the EU- funded Human Brain Project',
    type: 'General',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description' },
    aggs: { 'sex.keyword': 'Sex', 'species.keyword': 'Species', 'methods.keyword': 'Methods' }
  },

  scr_017041_sparc: {//DONE
    label: 'SPARC',
    description: 'Stimulating Peripheral Activity to Relieve Conditions (SPARC)',
    type: 'General',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description', 'item.modalities': 'Modalities' },
    aggs: { 'anatomy.organ.name.keyword': 'Organ', 'item.modalities.keyword': 'Modalities', 'item.keywords.keyword': 'Keywords', 'item.techniques.keyword': 'Techniques', 'organisms.primary.species.name.keyword': 'Species', 'protocols.keyword': 'Protocol' }
  },

  scr_005031_openneuro: {//DONE
    label: 'OpenNEURO',
    description: 'A free and open platform for sharing MRI, MEG, EEG, iEEG, ECoG, and ASL data',
    type: 'General',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description' },
    aggs: { 'BIDSVersion.keyword': 'BIDS Version', 'Authors.keyword': 'Authors', 'License.keyword': 'License' }
  },
  scr_005069_brainminds: {//DONE
    label: 'Brain/MINDS',
    description: 'For sharing the data and knowledge being produced in the Brain/MINDS project. The portal aims to provide integrated knowledge for public use and original data for open research and collaboration.',
    type: 'General',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description' },
    aggs: { 'keywords.keyword': 'Keywords' }
  },
  scr_017571_dandi: {
    label: 'DANDI Archive',
    description: 'The BRAIN Initiative archive for publishing and sharing cellular neurophysiology data.',
    type: 'General',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description', 'species': 'Species' },
    aggs: { 'dataStandard.keyword': 'Data Standard', 'about.keyword': 'Is About', 'measurementTechnique.keyword': 'Measurement Technique', 'keywords.keyword': 'Keywords', 'species.keyword': 'Species', 'license.keyword': 'License' }
  },
  scr_016433_conp: {//DONE
    label: 'CONP Portal',
    description: 'Canadian Open Neuroscience Platform',
    type: 'General',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description', 'keywords': 'Keywords' },
    aggs: {
      'keywords.keyword': 'Keywords', 'isAbout.keyword': 'Is About', 'license.keyword': 'License', 'formats.keyword': 'Formats', "creators.keyword": "Creators"
    }
  },
};
