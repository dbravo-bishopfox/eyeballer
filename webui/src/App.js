import React, { Component } from 'react';
import logo from './eyeballer_logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as tf from '@tensorflow/tfjs';
import UploadDirectory from './components/UploadDirectory';
import PresentResults from './components/PresentResults';
import ClassifyButton from './components/ClassifyButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileContents: "Try uploading a file",
      classifiedObjects: [],
      imageObjects: [],
    }
  }

  // func = () => {} will bind the function, similar to `func = this.func.bind(this)`
  handleFileUpload = (objects) => {
    this.setState({imageObjects: objects});
  }

  handleClassification = (objects) => {
    this.setState({classifiedObjects: objects})
  }

  render() {
    const classifiedObjects = this.state.classifiedObjects;
    const imageObjects = this.state.imageObjects;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Eyeballer</h2>
        </div>
        <ClassifyButton onClassification={this.handleClassification} objects={imageObjects}/>
        <UploadDirectory onFileUpload={this.handleFileUpload}/>
        {classifiedObjects.length > 0 && <PresentResults objects={classifiedObjects}/>}
        {/* Export files (selected) in categories of list. In .txt & (csv-like) file for all results */}
      </div>
    );
  }
}

export default App;