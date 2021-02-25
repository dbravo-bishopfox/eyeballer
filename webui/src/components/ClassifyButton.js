import React from 'react';
import * as tf from '@tensorflow/tfjs';
import Spinner from 'react-bootstrap/Spinner';
class ClassifyButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            progress : 0,
            model: null
        }
    }

    async componentDidMount(){
        const modelUrl = 'jsmodel/model.json';
        const model = await tf.loadLayersModel(modelUrl);
        this.setState({model : model})
    }
    // for each object classify and construct classifiedObject
    // populate classifiedObjects
    onpress = async () => {
        this.setState({progress:1});
        const model = this.state.model;
        const offset = tf.scalar(127.5);
        const imageURIs = this.props.uris; // Map<num,uri>
        let classifiedObjects = [];
        
        imageURIs.forEach( (img,index) => { //plan to use the index to set up the webworkers
            const tfTensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([224,224])
            .toFloat()
            .sub(offset)
            .div(offset)
            .expandDims();
            const predictions = Array.from(model.predict(tfTensor).dataSync()); // syncrhonous
            tf.dispose(tfTensor);
            let classification = new Set();
            if (predictions[0] > 0.5) {
                classification.add("Custom 404");
            }
            if (predictions[1] > 0.5) {
                classification.add("Login Page");
            }
            if (predictions[2] > 0.5) {
                classification.add("Homepage");
            }
            if (predictions[3] > 0.5) {
                classification.add("Old Looking");
            }
            classifiedObjects.push({imageURI: img.src, classification: classification});
        })
        this.props.onClassification(classifiedObjects);
    }
        
      
    render() {
        return (
            <div>
              <button className="default" type="button" id="predictButton" onClick={this.onpress}>Classify</button>
              {this.state.progress > 0 && <Spinner animation="border" /> }
            </div>
          );
    }
}

export default ClassifyButton;