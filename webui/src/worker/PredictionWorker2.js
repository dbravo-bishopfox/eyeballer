import * as Comlink from "comlink";
import * as tf from "@tensorflow/tfjs";

let model;
class PredictionWorker2 {
    async loadmodel(){
        try {
            model = await tf.loadLayersModel("jsmodel/model.json");
        } catch (err) {
            console.error("Could not load model: ", err);
        }
    }
    
    async predict(tensorData){
        await loadmodel()
        if(!model){
            console.error("Model is null: ");
            return new Error("Could not classify because model was not loaded");
        }
        const tfTensor = tf.tensor3d(tensorData);
        const predictions = Array.from(model.predict(tfTensor).dataSync()); 
        tfTensor.dispose();
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
        return classification
    }
}

Comlink.expose(PredictionWorker2)
// export default PredictionWorker