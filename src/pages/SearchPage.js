import React, { useEffect, Suspense, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EntitySearch from "features/entitySearch/EntitySearch";
import querystring from "querystring";
import DataSpaceFreeTextSearch from "../features/dataSpace/DataSpaceFreeTextSearch";
import FreeTextParent from "../features/freeTextSearch/freeTextParentSearch";
import LiteratureSearch from "../features/literature/LiteratureSearch";
import TrainingSpaceSearch from "../features/trainingSpace/TrainingSpaceSearch";
import { searchStyles } from "./HomePage";
import { withStyles } from "@material-ui/core";
import dataSource from "../imgs/datasource.svg";
import publications from "../imgs/publications.svg";
import terms from "../imgs/terms.svg";
import training from "../imgs/training.svg";


function TabPanel(props) {
  const { children, ...other } = props;

  return (
    <div role="tabpanel" {...other}>
      {children}
    </div>
  );
}

function SearchPage(props) {
  const params = new URLSearchParams(props.location.search);
  const q = params.get('q');
  const [value, setValue] = React.useState(0);
  const [searchText, setSearchText] = React.useState(q);

  useEffect(() => {
    const oldValue = value;
    setValue(-1);
    setValue(oldValue);
  }, [searchText]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event, searchText) => {
    event.preventDefault();
    setSearchText(searchText);
  };
  const history = { pathname: "/search", search: `q=${q}` };

  const LoadLiteratureSearch = (props) => {
    const [loadCmp, setLoading] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 400);
    }, [loadCmp]);

    return (
      loadCmp && (
        <LiteratureSearch
          slug={props.searchText}
          fromSearch={true}
        ></LiteratureSearch>
      )
    );
  };

  const LoadTrainingSearch = (props) => {
    const [loadCmp, setLoading] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setLoading(true);
      }, 400);
    }, [loadCmp]);

    return (
      loadCmp && (
        <TrainingSpaceSearch
          slug={props.searchText}
          fromSearch={true}
        ></TrainingSpaceSearch>
      )
    );
  };

  return (
    <div>
      <div className={props.classes.searchContainer}>
        <FreeTextParent
          classes={props.classes}
          handleSubmit={handleSubmit}
          history={history}
          searchText={q}
        />
      </div>
      <Tabs
        value={value}
        slug={searchText}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className="free-text-tabs-parent"
      >
        <Tab
          label={
            <>
              <img className="tabIcon" src={dataSource}></img>
              <label className="tabLabel">Datasources</label>
            </>
          }
        ></Tab>
        <Tab
          label={
            <>
              <img className="tabIcon" src={publications}></img>
              <label className="tabLabel">Publications</label>
            </>
          }
        />
        <Tab
          label={
            <>
              <img className="tabIcon" src={terms}></img>
              <label className="tabLabel">Terms</label>
            </>
          }
        />
        <Tab
          label={
            <>
              <img className="tabIcon" src={training}></img>
              <label className="tabLabel">Training</label>
            </>
          }
        />
      </Tabs>
      <div index={value}>
        {value === 0 && (
          <TabPanel>
            <DataSpaceFreeTextSearch slug={searchText} dataSpace={{}} />;
          </TabPanel>
        )}
        {value === 1 && (
          <TabPanel>
            {
              <LoadLiteratureSearch
                searchText={searchText}
              ></LoadLiteratureSearch>
            }
          </TabPanel>
        )}
        {value === 2 && (
          <TabPanel>
            <EntitySearch q={searchText} history={props.history} />
          </TabPanel>
        )}
        {value === 3 && (
          <TabPanel>
            {
              <LoadTrainingSearch
                searchText={searchText}
              ></LoadTrainingSearch>
            }
          </TabPanel>
        )}
      </div>
    </div>
  );
}

export default withStyles(searchStyles)(SearchPage);
