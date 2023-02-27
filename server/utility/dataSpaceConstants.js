// copy of client file
const DATASPACE_SOURCES = {
  scr_0137950_neuroml_models: {
    label: 'NeuroML Database',
    description: 'Curated relational database that provides for the storage and retrieval of computational neuroscience model.',
    type: 'models',
    columns: { 'dc.title': 'Model Name', model_type: 'Model Type', 'dc.creator': 'Authors', 'dc.subject': 'Keywords' },
    aggs: { 'model_type.keyword': 'Model Type', 'dc.creator.keyword': 'Authors', 'dc.subject.keyword': 'Keywords' }
  },
  scr_002145_neuromorpho_modelimage: {
    label: 'NeuroMorpho',
    description: 'A curated repository of digitally reconstructed neurons.',
    type: 'morphology',
    columns: { 'dc.title': 'Model Name', 'dc.subject': 'Subjects', age: 'Age', gender: 'Gender', strain_name: 'Strain' },
    aggs: { 'species.keyword': 'Model Name', 'strain_name.keyword': 'Strain', 'dc.subject.keyword': 'Subject' }
  },
  scr_007271_modeldb_models: {
    label: 'ModelDB',
    description: 'Provides high quality computational neuroscience models. ModelDB is tightly coupled with NeuronDB.',
    type: 'models',
    columns: { 'dc.title': 'Model Name', model_type: 'Model Type', model_concepts: 'Model Concepts', simulator_software: 'Software' },
    aggs: { 'model_concepts.keyword': 'Model Concepts', 'simulator_software.keyword': 'Software', 'model_type.keyword': 'Model Type' }
  },
  scr_006131_hba_atlas: {
    label: 'Human Brain Atlas',
    description: 'Contains sections stained for cell bodies or nerve fibers, as well as corresponding MRI sections through a living human brain.',
    type: 'anatomy',
    columns: { 'species': 'Species', 'brain_region': 'Brain Region', 'brain_view': 'Brain View' },
    aggs: { 'species.keyword': 'Species', 'brain_region.keyword': 'Brain Region', 'brain_view.keyword': 'Brain View' }
  },
  scr_002978_aba_expression: {
    label: 'Allen Brain Atlas Mouse Brain - Expression',
    description: 'A genome_wide database of gene expression in the mouse brain.',
    type: 'expression',
    columns: { 'dc.title': 'Gene', organism: 'Organism', species: 'Species' },
    aggs: { 'gene_name.keyword': 'Gene', 'organism.keyword': 'Organism', 'species.keyword': 'Species' }
  },
  scr_002978_aba_celltypeephysdata: {
    label: 'Allen Brain Atlas Mouse Brain - CellType EphysData',
    description: 'Provides a database of neuronal cell types based on multimodal characterization of single cells to enable data_driven approaches to classification. For more details about the experiments, please refer to the technical white paper.',
    type: 'physiology'
  },
  scr_002721_gensat_geneexpression: {
    label: 'GENSAT',
    description: 'Contains gene expression data and maps of the mouse brain and spinal cord.',
    type: 'expression',
    columns: { gene_name: 'Gene', structure_name: 'Structure', stain: 'Stain', age: 'Age' },
    aggs: { 'gene_name.keyword': 'Gene', 'structure_name.keyword': 'Structure', 'stain.keyword': 'Stain' }
  },
  scr_014194_icg_ionchannels: {
    label: 'IonChannelGenealogy',
    description: 'Provides a quantitative assay of publicly available ion channel models.',
    type: 'models',
    columns: { 'dc.title': 'Title', 'dc.subject': 'Species', brain_area: 'Brain Area', neuron_type: 'Neuron' },
    aggs: { 'dc.subject.keyword': 'Species', 'brain_area.keyword': 'Brain Area', 'neuron_type.keyword': 'Neuron' }
  },
  scr_003105_neurondb_currents: {
    label: 'NeuronDB',
    description: 'Provides data about neurotransmitter properties for submitted neurons.',
    type: 'physiology',
    columns: { neuron: 'Neuron', current: 'Current', compartment: 'Compartment' },
    aggs: { 'neuron.keyword': 'Neuron', 'current.keyword': 'Current', 'compartment.keyword': 'Compartment' }
  },
  // scr_006878_brainmaps_atlas: {
  //   label: 'BrainMaps',
  //   description: 'A high_resolution brain atlas of primate and non-primate brains.',
  //   type: 'anatomy'
  // },
  // scr_002187_integrated_connectivity: {
  //   label: 'Integrated',
  //   description: 'An aggregated dataset of connectivity statements from CoCoMac,Connectome Wiki, the Hippocampal-Parahippocampal Table of Temporal-Lobe.com and Avian Brain Circuitry Database. Connectome Wiki, CoCoMac, and Avian Brain Circuitry Database are no longer in service, so the links may not be functional.',
  //   type: 'anatomy'
  // },
  scr_006274_neuroelectro_ephys: {
    label: 'NeuroElectro',
    description: 'A database of elecrophysiological properties text-mined from the biomedical literature as a function of neuron type.',
    type: 'physiology',
    columns: { 'dc.title': 'Title', 'dc.description': 'Description', property_name: 'property_name' },
    aggs: { 'property_name.keyword': 'property_name' }
  },
  scr_003510_cil_images: {
    label: 'Cell Image Library',
    description: 'Provides annotated images, videos and animations of cellular processes.',
    type: 'morphology',
    aggs: { 'species.keyword': 'Species', 'celltype.keyword': 'Cell Type', 'biologicalprocess.keyword': 'Biological Process' },
    columns: {
      'image_url': 'Image', 'species': 'Species', 'dc.creator': 'Authors',
      'biologicalprcoess': 'Biological Process',
      'celltype': 'Cell Type'
    }
  },
  scr_002978_aba_celltypemorphodata: {
    label: 'Allen Brain Atlas Mouse Brain - CellType MorphoData',
    description: 'Provides a database of neuronal cell types based on multimodal characterization of single cells to enable data_driven approaches to classification.',
    type: 'morphology'
  },
  scr_014306_bbp_cellmorphology: {
    label: 'Blue Brain Project Cell Morphology',
    description: '3D Models of rat neuronal morphologies.',
    type: 'morphology',
    aggs: { 'dc.subject.keyword': 'Cell', 'region_term.keyword': 'Region' },
    columns: { 'dc.title': 'Title', 'dc.subject': 'Cell', 'region_term': 'Region' }
  },
  scr_017612_ebrains: {
    label: 'EBRAINS',
    description: 'EBRAINS web platform is the entry point for researchers to discover EBRAINS services. The services were developed by, and are powered by the EU-funded Human Brain Project',
    type: 'Uncategorized',
    columns: { 'item.name': "Title", 'item.description': 'Description', 'subjects.sex.value':'Sex' },
    aggs: { 'subjects.sex.value.raw': 'Sex', 'organisms.subject.species.name.raw': "Species", 'protocol.methods.name.raw': 'Methods' }
  }
  }
  module.exports = DATASPACE_SOURCES;