# AGENTS.md

KnowledgeSpace (knowledge-space.org): Create React App frontend + a separate plain-CommonJS
Express API that proxies Elasticsearch and Neo4j. No test suite, no lint script, no TypeScript.

## Commands

Two processes are required for anything to work:

- `npm start` — CRA dev server (port 3000)
- `npm run server` — `npx nodemon server/server.js`, Express on hardcoded port 5000
- `npm run build` — must be run before opening the Express server directly: `server/server.js`
  serves `../build` and its catch-all `GET /*` returns `../build/index.html`, so a missing/stale
  `build/` yields a blank page.
- `CI=true npm test` — single run (there are currently **no** test files, no `setupTests.js`).

ESLint only runs inside react-scripts (`eslintConfig.extends: react-app` in package.json).
`react-scripts build` fails on ESLint *errors* when `CI=true`; GitLab CI exports `CI=false`,
so deploy builds tolerate warnings.

Deploy (`.gitlab-ci.yml`): two jobs tagged `ks-stage` / `ks-master` ssh into
`/opt/knowledge-space-new/`, `git checkout stage|master`, pull, `npm install`, `npm run build`,
then `sudo service application restart` + `sudo service nginx restart`. Note only `master`
exists on `origin` today.

## Environment / setup gotchas

- **No root `.env` is committed** (gitignored) and none exists in a fresh clone.
  `server/.env.production` is the only committed record of the expected variables.
- **`NODE_PATH=src` is mandatory.** Every import is absolute from `src/`
  (`app/layout/App`, `features/...`, `pages/...`, `common/...`). There is no `jsconfig.json`
  or `baseUrl`, so react-scripts 3 resolves them only through `NODE_PATH`. Without it the build
  fails with "Module not found: app/layout/App".
- Client vars: `REACT_APP_API_END_POINT`, `REACT_APP_GA_TRACKING_ID`
  (unset ⇒ `GA.init()` returns `undefined` ⇒ analytics silently off).
- `REACT_APP_API_END_POINT` is **string-concatenated** (`API_END_POINT + 'entity/details'`), so
  it must keep a trailing slash and must point at the Express server, e.g.
  `http://localhost:5000/` in dev. Every client call site uses it; nothing uses relative URLs, so
  the `"proxy": "http://localhost:5000"` field in package.json is effectively unused.
- Server vars (loaded by `dotenv.config()` from the repo root): `REACT_APP_ES_DATASPACE_URL`,
  `REACT_APP_ES_DATASPACE_USER`, `REACT_APP_ES_DATASPACE_PASS`, `REACT_APP_API_END_POINT`, and
  `NEO4J_{PROTOCOL,HOST,PORT,USERNAME,PASSWORD}_{UBERON,NIFSTD}` (two separate Neo4j databases:
  UBERON for the brain-region graph, NIFSTD for external-id lookup).
- `server/server.js` `require`s `body-parser` and `dotenv`, which are **not** in
  package.json — they only resolve via react-scripts' hoisted transitive deps. Don't assume
  any other server dep is installed; add it explicitly.

## Architecture

Flow: component dispatches action → `src/app/sagas/watchers.js` (`takeLatest`) → feature saga →
`src/clients/*.js` (axios) → Express `/entity/*` (`routes/client-routes.js`) and `/graph/*`
(`routes/other-routes.js`) → Elasticsearch / Neo4j.

- Adding a redux feature touches **four** registration points: the feature's own
  `*Constants.js` / `*Actions.js` / `*Reducer.js` / `*Saga.js`, then
  `app/reducers/rootReducer.js`, `app/sagas/watchers.js`, and `app/sagas/rootSaga.js`.
  Action type constants live per-feature (`src/constants/actionTypes.js` is empty).
  Reducers use `createReducer(initialState, { [TYPE]: fn })` from `common/utils/reducerUtils`.
- Routes live only in `src/app/layout/Main.js`; page components in `src/pages/`.

## Elasticsearch specifics

- **ES queries are built in the browser and sent as a JSON string in a GET query param**
  (`axios.get(url, { params: { body } })`), then `JSON.parse(req.query.body)` server-side.
  Keep bodies small — they hit URL length limits.
- Index names are hardcoded in `server/routes/client-routes.js`:
  `scigraph` (entities/slugs), `pubmed` (literature), `train_scr_022036_trainingspace`,
  `scr*` (all data sources). Target ES is v8: mapping types (`type: "_doc"`) were removed in
  commit `d0c0c10` — never reintroduce them. `pubmed` is an alias, not `pubmed-19`.
- `elasticsearch/` holds `mappings.json` for dataspace/literature, a `scigraph/mapping.sh`
  (curl PUT) and a Ruby `dataspace/indexer.rb`. They contain hardcoded private-IP ES hosts.
  Field names in queries (`category.keyword`, `curies`, `curie_paths`, `title^99`,
  `labels^10`) must match those mappings.
- **`server/utility/dataSpaceConstants.js` is a stale "copy of client file"** of
  `src/features/dataSpace/dataSpaceConstants.js` and has drifted (e.g.
  `scr_0137950_neuroml_models` vs the client's `scr_013705_neuroml_models`, different
  `columns`/`aggs`). Treat the client copy as authoritative for aggregation field names.

## Code hazards (pre-existing, verify before "fixing")

- Neo4j Cypher in `server/routes/other-routes.js` is built by string concatenation of request
  params (`req.query.term`, `external_id`) with manual quoting; preserve that quoting style when
  editing or you will break the query syntax.
- That file also assigns `cypher_query = ...` without a declaration (implicit global).
- `src/clients/ESClient.js` exports only `API_END_POINT`, but `AutosuggestClient.js`,
  `EntityClient.js`, `BrainRegionClient.js` still `import { esclient, ... }` — a dead import
  producing a webpack warning. Not a real dependency.
- Dead code, don't wire it up: `src/pages/HomePage-old.js`, `src/app/layout/Nav_ORG.js`,
  `src/clients/ESQueryBuilder.js`, `src/pages/to-do` (scratch notes), and a stray
  `src/imgs/OsmAnd-resources-master.zip`.

## Repo hygiene

- Both `package-lock.json` and `yarn.lock` are committed, and `.yarnrc` enables an
  offline mirror (`offline-mirror/`, 1730 tarballs, ~35 MB). Don't regenerate the other
  lockfile as a side effect of a `npm install`.
- `.gitattributes` force-marks `*.js` as `linguist-vendored` (stale CRA boilerplate).
- No live Elasticsearch/Neo4j endpoints or credentials live in the repo (they're in the
  untracked root `.env` / private-IP helper scripts), so the API routes can't be exercised
  without external infrastructure. Verify UI changes against the redux/saga flow rather than
  expecting real data locally.
