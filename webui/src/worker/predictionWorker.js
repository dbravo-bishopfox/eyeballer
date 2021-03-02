import * as tf from "@tensorflow/tfjs";

export default async () => {
  //load model
  let model;
  try {
    model = await tf.loadLayersModel("jsmodel/model.json");
  } catch (err) {
    console.error("Could not load model: ", err);
  }
  const offset = tf.scalar(127.5);

  //when data is recieved
  self.onmessage((ev) => {
    if (!model) {
      console.error("No model loaded when predicting", err);
    }
    let images = ev.data;
    let classifiedObjects = [];
    images.forEach((img) => {
      const tfTensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .sub(offset)
        .div(offset)
        .expandDims();
      const predictions = Array.from(model.predict(tfTensor).dataSync());
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
      classifiedObjects.push({
        imageURI: img.src,
        classification: classification,
      });
    });

    self.postMessage(classifiedObjects);
  });
};
