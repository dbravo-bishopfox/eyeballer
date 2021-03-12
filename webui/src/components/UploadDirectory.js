import React from "react";

//upload a directory of images
class UploadDirectory extends React.Component {
  handleChange = (e) => {
    //Upload files && prepare object
    let images = [];
    const files = e.target.files;
    for (let nFileId = 0; nFileId < files.length; nFileId++) {
      const currentImg = new Image(224, 224);

      let reader = new FileReader();
      reader.onload = function () {
        currentImg.src = reader.result;
      };
      const currentFile = files[nFileId];
      reader.readAsDataURL(currentFile);
      currentImg.onload = () => {
        currentImg.alt = currentFile.name;
        images.push(currentImg);
      };
    }
    this.props.onFileUpload(images);
  };

  render() {
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
    );
  }
}
export default UploadDirectory;
