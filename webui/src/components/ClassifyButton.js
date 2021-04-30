import React from "react";
import * as tf from "@tensorflow/tfjs";
class ClassifyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      model: null,
    };
  }

  async componentDidMount() {
    const modelUrl = "jsmodel/model.json";
    const model = await tf.loadLayersModel(modelUrl);
    this.setState({ model: model });
  }

  onpress = async () => {
    this.setState(() => ({ progress: 1 }));
    const model = this.state.model;
    const offset = tf.scalar(127.5);
    const images = this.props.images;
    let classifiedObjects = [];

    for (let img of images) {
      const tfTensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .sub(offset)
        .div(offset)
        .expandDims();
      const rawPredictions = await model.predict(tfTensor).data();
      tfTensor.dispose();
      const predictions = Array.from(rawPredictions);
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
      console.log("Classification ", Array.from(classification).toString());
      classifiedObjects.push({
        imageURI: img.src,
        classification: classification,
        fileName: img.alt,
      });
    }
    this.setState(() => ({ progress: 2 }));
    this.props.onClassification(classifiedObjects);
  };

  render() {
    return (
      <div>
        <button
          className="default"
          type="button"
          id="predictButton"
          onClick={this.onpress}
          disabled={this.state.progress == 1}
        >
          Classify
        </button>
        {this.state.progress == 1 && <div>Classifying...</div>}
        {this.state.progress == 2 && <div>Results:</div>}
      </div>
    );
  }
}

export default ClassifyButton;
