import React from 'react';
import * as tf from '@tensorflow/tfjs';

//upload a directory of images and prepare imageObjects with Tensor
class UploadDirectory extends React.Component {
    
    handleChange = (e) => {
        //Upload files && construct imageObjects: [ {tensor: value, imageURI: value}, ... ]
        let imageObjects = []
        const files = e.target.files
        for (let nFileId = 0; nFileId < files.length; nFileId++){
            const currentImg = new Image();

            let reader = new FileReader();
            reader.onload = function(){
                currentImg.src = reader.result;
            };

            reader.readAsDataURL(files[nFileId]);
            currentImg.onload = () => {
                const tfTensor = tf.browser.fromPixels(currentImg);
                imageObjects.push({tensor: tfTensor, imageURI: currentImg.src});
            }
        }
        this.props.onFileUpload(imageObjects);
    }
    
    render(){
        return (
                <label>
                    Upload a directory
                <input 
                    type="file" 
                    directory="" 
                    webkitdirectory="" 
                    onChange={this.handleChange}
                />
                </label>
        )
       
        
    }

}

export default UploadDirectory;