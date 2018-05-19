import React from "react";
import _ from "lodash";
import PatientForm from "../../shares/patient_form";

class HomepageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {};
  }

  componentWillReceiveProps(newProps) {
    if (newProps.createdPatient && (!this.props.createdPatient || this.props.createdPatient.id != newProps.createdPatient.id)) {
      this.setState({createdPatient: newProps.createdPatient});
    }
  }

  render() {
    var mainContent;
    var patient = this.state.createdPatient;

    if (patient) {
      mainContent = (
        <div className="text-center">
          <ul className="list-unstyled">
            <li><a href={"/patients/" + patient.id + ".pdf"} target="_blank">Download pdf of {patient.name}</a></li>
            <li><a href="#" onClick={(evt)=> {evt.preventDefault(); this.setState({createdPatient: null})}}>New patient</a></li>
          </ul>
        </div>
      );
    } else {
      mainContent = (
        <PatientForm />
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {mainContent}
          </div>
        </div>
      </div>
    );
  }
}

export default HomepageView;
