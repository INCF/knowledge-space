import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "app/store/configureStore";
// Relative, not the `styles/...` absolute form used elsewhere: this file sits in
// src/, so a relative path also resolves when NODE_PATH=src is not set.
import "./styles/theme.css";

const store = configureStore();

// Save a reference to the root element for reuse
const rootEl = document.getElementById("root");

const render = () => {
  const App = require("app/layout/App").default;
  console.debug("render me");
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootEl
  );
};

// if (process.env.NODE_ENV !== "production") {
//   console.debug("render me");
//   if (module.hot) {
//     // Support hot reloading of components.
//     // Whenever the App component file or one of its dependencies
//     // is changed, re-import the updated component and re-render it
//     module.hot.accept("app/layout/App", () => {
//       setTimeout(render);
//     });
//   }
// }

render();
