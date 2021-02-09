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
    // this.setState({imageObjects: objects});
    this.setState(() => ({
      imageObjects: objects
    }));
  }

  handleClassification = (objects) => {
    this.setState(() => ({
      classifiedObjects: objects
    }));
  }

  render() {
    const classifiedObjects = this.state.classifiedObjects;
    const imageObjects = this.state.imageObjects;
    console.log("line 32", imageObjects);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Eyeballer</h2>
        </div>
        <PredictButton />
        <ClassifyButton onClassification={this.handleClassification} objects={imageObjects}/>
        <ImageFile />
        <UploadDirectory onFileUpload={this.handleFileUpload}/>
        {classifiedObjects.length > 0 && <PresentResults objects={classifiedObjects}/>}

      </div>
    );
  }
}

export default App;

class ImageFile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id : "someUniqueId", // I would use this.props.id for a real world implementation
      imageURI : null
    }
  }

  buildImgTag(){
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (<div className="row">
                  <div className="small-9 small-centered columns">
                    <img className="thumbnail" id="thumbnail" alt="Screenshot to be classified" src={this.state.imageURI}></img>
                  </div>
                </div>);
    return imgTag;
  }

  readURI(e){
    if(e.target.files && e.target.files[0]){
      let reader = new FileReader();
      reader.onload = function(ev){
        this.setState({imageURI:ev.target.result});
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(e){
    this.readURI(e); // maybe call this with webworker or async library?
    if (this.props.onChange !== undefined)
      this.props.onChange(e); // propagate to parent component
  }

  render() {
    const imgTag = this.buildImgTag();

    return <div>
            <label
              htmlFor={this.state.id}
              className="button">
              Upload an image
            </label>
            <input
              id={this.state.id}
              type="file"
              onChange={this.handleChange.bind(this)}
              className="show-for-sr" />
            {imgTag}
          </div>;
  }
}

class PredictButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classification: ""
    }
  }

  onpress = async () => {
    const modelUrl = 'jsmodel/model.json';
    const model = await tf.loadLayersModel(modelUrl);
    const offset = tf.scalar(127.5);
    //get images to process
    const image = tf.browser.fromPixels(document.getElementById('thumbnail'))
      .resizeNearestNeighbor([224,224])
      .toFloat()
      .sub(offset)
      .div(offset)
      .expandDims();

    const predictions = Array.from(model.predict(image).dataSync());
    this.setState({classification: ""});
    if (predictions[0] > 0.5) {
      this.setState({classification: this.state.classification + "Custom 404, "});
    }
    if (predictions[1] > 0.5) {
      this.setState({classification: this.state.classification + "Login Page, "});
    }
    if (predictions[2] > 0.5) {
      this.setState({classification: this.state.classification + "Homepage, "});
    }
    if (predictions[3] > 0.5) {
      this.setState({classification: this.state.classification + "Old Looking "});
    }

  }

  render() {
    return (
      <div className="custom-file">
        <button className="default" type="button" id="predictButton" onClick={this.onpress}>Classify</button>
        {this.state.classification}
      </div>
    );
  }

}
