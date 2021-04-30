import React, { Component, useState } from "react";
import logo from "./eyeballer_logo.png";
import "./App.css";
import UploadDirectory from "./components/UploadDirectory";
import PresentResults from "./components/PresentResults";
import ClassifyButton from "./components/ClassifyButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classifiedObjects: [],
      images: [],
    };
  }

  // func = () => {} will bind the function, similar to `func = this.func.bind(this)`
  handleFileUpload = (images) => {
    this.setState({ images: images });
  };

  handleClassification = (objects) => {
    this.setState({ classifiedObjects: objects });
  };
  handleExport = (objects) => {
    this.setState({ export: objects });
  };

  render() {
    const classifiedObjects = this.state.classifiedObjects;
    const images = this.state.images;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Eyeballer</h2>
        </div>
        <ClassifyButton
          onClassification={this.handleClassification}
          images={images}
        />
        <UploadDirectory onFileUpload={this.handleFileUpload} />
        {classifiedObjects.length > 0 && (
          <PresentResults
            objects={classifiedObjects}
            raiseFilter={this.raiseFilter}
          />
        )}
      </div>
    );
  }
}

export default App;
