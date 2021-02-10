import React from 'react';
import * as tf from '@tensorflow/tfjs';
import ProgressBar from 'react-bootstrap/ProgressBar';
class ClassifyButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            progress : 0
        }
    }
    // for each object classify and construct classifiedObject
    // populate classifiedObjects
    onpress = async () => {
        const modelUrl = 'jsmodel/model.json';
        const model = await tf.loadLayersModel(modelUrl);
        const offset = tf.scalar(127.5);

        const objects = this.props.objects;
        let classifiedObjects = [];
        
        objects.forEach( (object) => {
            const image = object.tensor
            .resizeNearestNeighbor([224,224])
            .toFloat()
            .sub(offset)
            .div(offset)
            .expandDims();
    
            const predictions = Array.from(model.predict(image).dataSync());
            let classification = new Set();
            console.log("predictions!",predictions[3]);
            if (predictions[0] > 0.5) {
                classification.add("Custom 404");
                // classification += "Custom 404, ";
            }
            if (predictions[1] > 0.5) {
                classification.add("Login Page");
                // classification += "Login Page, ";
            }
            if (predictions[2] > 0.5) {
                classification.add("Homepage");
                // classification += "Homepage, ";
            }
            if (predictions[3] > 0.5) {
                classification.add("Old Looking");
                // console.log("predictions!",predictions[3]); tensor vs image process produces different result.
                // classification += "Old Looking ";
            }
            classifiedObjects.push({imageURI: object.imageURI, classification: classification});
            this.setState({progress: this.state.progress + 100/objects.length}, (r) => {
                setTimeout(r, 2000);
            })
        })
        this.props.onClassification(classifiedObjects);
    }
        
      
    render() {
        return (
            <div className="custom-file">
              <button className="default" type="button" id="predictButton" onClick={this.onpress}>Classify2</button>
              <ProgressBar animated now={this.state.progress} />
            </div>
          );
    }
}

export default ClassifyButton;