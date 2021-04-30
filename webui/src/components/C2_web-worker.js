// import React from "react";
// import Spinner from "react-bootstrap/Spinner";
// import worker from "../worker/predictionWorkerV2.js";
// import WebWorker from "../worker/WebWorker";
// import * as Comlink from "comlink";
// import * as tf from "@tensorflow/tfjs";

// class c2 extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       progress: 0,
//     };
//   }
//   //make the tensor, pass it and predict in web worker.

//   //for each image, create the tensor, send it to the webworker to predict and not block UI, wait for response
//   //store classifications, destory tensor and move on to the next image.
//   onpress = async () => {
//     const images = this.props.images;
//     const offset = tf.scalar(127.5);

//     // const predictionWorkerV2 = new Worker("../worker/predictionWorkerV2.js");
//     // const predictionAPI = Comlink.wrap(predictionWorkerV2);

//     for(let img of images){ //instead of custom async foreach
//       const tfTensorData = tf.browser
//       .fromPixels(img)
//       .resizeNearestNeighbor([224, 224])
//       .toFloat()
//       .sub(offset)
//       .div(offset)
//       .expandDims()
//       const classificationPromise = await predictionAPI.predict(tfTensorData.arraySync()).then(() => {
//         tfTensorData.dispose()
//         classifiedObjects.push({
//           imageURI: img.src,
//           classification: classification,
//         });
//       });

//     }
//   };

//   render() {
//     return (
//       <div>
//         {this.state.progress < 1 && (
//           <button
//             className="default"
//             type="button"
//             id="predictButton"
//             onClick={this.onpress}
//           >
//             Classify
//           </button>
//         )}
//         {this.state.progress == 1 && <Spinner animation="border" />}
//       </div>
//     );
//   }
// }

// // export default c2;
