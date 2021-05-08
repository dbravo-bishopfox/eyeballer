import React from "react";
import { CSVLink } from "react-csv";
import Dropdown from "react-bootstrap/Dropdown";
//https://www.npmjs.com/package/react-csv
//https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3
//objects = [{classification: Set(), fileName: "http-104.21.38.175.png", imageURI}]
class ExportResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleClassifications: [
        "Custom 404",
        "Login Page",
        "Homepage",
        "Old Looking",
      ],
      downloadInitialized: false,
      data: [],
    };
  }

  classificationCSV = (classifications) => {
    let result = [];
    this.state.possibleClassifications.forEach((value) => {
      if (classifications.has(value)) {
        result.push("true");
      } else {
        result.push("false");
      }
    });
    return result;
  };

  exportCSVData = () => {
    let csvData = [this.state.possibleClassifications]; //Set Header
    let selectedObjects = this.props.selectedObjects;
    selectedObjects.map((object) => {
      //custom thing to determine which classification is true
      const filename = object.fileName;
      const classifications = this.classificationCSV(object.classification);
      classifications.unshift(filename); // ["filename","true","false","false",..]
      csvData.push(classifications);
    });
    csvData[0].unshift("filename")//add filename header for formatting
    this.setState({ data: csvData, downloadInitialized: true });
  };

  render() {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Export
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <CSVLink
              data={this.state.data}
              filename={"eyeballer.csv"}
              className="btn btn-primary"
              target="_blank"
              onClick={this.exportCSVData}
            >
              Download me
            </CSVLink>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  }
}

export default ExportResults;
