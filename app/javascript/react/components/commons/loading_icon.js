import React from 'react';
import loadingFilePath from "../../../assets/images/loading.gif";

class LoadingIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var props = {...this.props};
    props.src = props.src || loadingFilePath;
    props.alt = props.alt || "Loading";

    return (
      <img {...props} />
    )
  }
}

export default LoadingIcon;
