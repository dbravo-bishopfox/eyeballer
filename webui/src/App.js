import React, { Component } from 'react';
import logo from './eyeballer_logo.png';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import UploadDirectory from './components/UploadDirectory';
import PresentResults from './components/PresentResults';
import ClassifyButton from './components/ClassifyButton';
import ExportResults from './components/ExportResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileContents: "Try uploading a file",
      classifiedObjects: [],
      imageURIs: new Map(),
    }
  }

  // func = () => {} will bind the function, similar to `func = this.func.bind(this)`
  handleFileUpload = (URIs) => {
    this.setState({imageURIs: URIs});
  }

  handleClassification = (objects) => {
    this.setState({classifiedObjects: objects})
  }
  handleExport = (objects) => {
    this.setState({export: objects})
  }

  render() {
    const classifiedObjects = this.state.classifiedObjects;
    const imageURIs = this.state.imageURIs;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Eyeballer</h2>
        </div>
        <ClassifyButton onClassification={this.handleClassification} uris={imageURIs}/>
        <UploadDirectory onFileUpload={this.handleFileUpload}/>
        {classifiedObjects.length > 0 && <PresentResults objects={classifiedObjects}/>}
        {/* Export files (selected) in categories of list. In .txt & (csv-like) file for all results */}
        {/* <ExportResults  /> */}
      </div>
    );
  }
}

export default App;