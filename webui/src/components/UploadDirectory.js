import React from 'react';
import * as tf from '@tensorflow/tfjs';

//upload a directory of images and prepare imageObjects with Tensor
class UploadDirectory extends React.Component {
    
    handleChange = (e) => {
        //Upload files && prepare object 
        let imageURIs = new Map()
        const files = e.target.files
        for (let nFileId = 0; nFileId < files.length; nFileId++){
            const currentImg = new Image(224,224);

            let reader = new FileReader();
            reader.onload = function(){
                currentImg.src = reader.result;
            };

            reader.readAsDataURL(files[nFileId]);
            currentImg.onload = () => {
                // const tfTensor = tf.browser.fromPixels(currentImg); Another place to webworker predict and add classification
                imageURIs.set(nFileId,currentImg);
            }
        }
        this.props.onFileUpload(imageURIs);
    }
    
    render(){
        return (
            <div>
                <p>Upload a Directory:</p>
                <input 
                    type="file" 
                    directory="" 
                    webkitdirectory="" 
                    onChange={this.handleChange}
                />
            </div>
        )
       
        
    }

}
export default UploadDirectory;