import React from 'react';
import {connect} from "react-redux";
import HomepageView from "./components/homepage_view";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  render() {
    return (
      <div className="page home-page">
        <HomepageView createdPatient={this.props.createdPatient} />
      </div>
    )
  }
}

function stateToProps(state, ownProps) {
  let sessionsStore = state.sessionsStore;
  let patientsStore = state.patientsStore;
  let props = {};

  if (sessionsStore) {
    props.currentUser = sessionsStore.currentUser;
  }

  if (patientsStore) {
    props.createdPatient = patientsStore.createdPatient;
  }

  return props;
}

Homepage = connect(stateToProps, {
})(Homepage);

export default Homepage;
