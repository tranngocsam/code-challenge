import React from "react";
import {connect} from "react-redux";
import { combineReducers } from 'redux';
import { Route, Switch } from "react-router-dom";
import sessionsReducer from './services/sessions/reducer';
import patientsReducer from "./services/patients/reducer";
import { loadSessionInfo } from "./services/sessions/actions";

import Homepage from "./scenes/homepage";

const reducer = combineReducers({
  sessionsStore: sessionsReducer,
  patientsStore: patientsReducer
});

export {reducer};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      currentUser: null
    };
  }

  componentWillMount() {
    this.props.loadSessionInfo();
  }

  render() {
    return (
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Homepage} />
        </Switch>
      </div>
    );
  }
}


function stateToProps(state, ownProps) {
  let sessionsStore = state.sessionsStore;
  let props = {};

  if (sessionsStore) {
    props.currentUser = sessionsStore.currentUser;
  }

  return props;
}

Main = connect(stateToProps, {
  loadSessionInfo
})(Main);

export {Main}
