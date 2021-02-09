import React from 'react';
import * as tf from '@tensorflow/tfjs';
class ClassifyButton extends React.Component {
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
            let classification = "";
            if (predictions[0] > 0.5) {
            classification += "Custom 404, ";
            }
            if (predictions[1] > 0.5) {
            classification += "Login Page, ";
            }
            if (predictions[2] > 0.5) {
            classification += "Homepage, ";
            }
            if (predictions[3] > 0.5) {
            classification += "Old Looking ";
            }
            classifiedObjects.push({imageURI: object.imageURI, classification: classification});
        })
        this.props.onClassification(classifiedObjects);
    }
        
      
    render() {
        return (
            <div className="custom-file">
              <button className="default" type="button" id="predictButton" onClick={this.onpress}>Classify2</button>
              {/* {classification} */}
            </div>
          );
    }
}

export default ClassifyButton;