/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from 'redux';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// import { Router, Route, IndexRoute, browserHistory } from "react-router";
// import createLogger from "redux-logger";
import {BrowserRouter, Route} from "react-router-dom";
import * as app from "../react/main";

const middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  // middleware.push(createLogger());
}

const store = createStore(app.reducer, applyMiddleware(...middleware));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={app.Main} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
