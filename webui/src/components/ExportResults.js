import React from "react";
import { CSVDownload } from "react-csv";
import Dropdown from "react-bootstrap/Dropdown";
//https://www.npmjs.com/package/react-csv
//https://dev.to/imjoshellis/simple-download-text-file-link-with-react-29j3
//objects = [{classification: Set(), fileName: "http-104.21.38.175.png", imageURI}]
class ExportResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleClassifications: ["custom404", "login", "homepage", "oldlooking"],
      downloadData: [],
    };
  }

  filterItems = (arr, filters) => {
    if (filters && filters.length > 0) {
      return arr.filter(this.props.filterMethod);
    } else {
      return arr;
    }
  };

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

  exportCSVData = (filters) => {
    let csvData = [this.state.possibleClassifications]; //Set Header
    let filteredObjects = this.filterItems(this.props.objects, filters);
    csvData.push(
      filteredObjects.map((object) => {
        //custom thing to determine which classification is true
        const filename = object.filename;
        const classifications = this.classificationCSV(object.classification);
        return classifications.unshift(filename); // ["filename","true","false","false"]
      })
    );
    this.setState({ downloadDate: csvData });
  };

  //take in the filters, dont take the filtered objects to avoid having more imforation in the dom

  // exportCSVData = (actionId) => {
  //   let csvData = [this.props.possibleClassifications]; //Set Header
  //   const objects = this.props.objects;
  //   switch (actionId) {
  //     //export_all
  //     case 0:
  //       csvData.push(
  //         objects.map((object) => {
  //           //custom thing to determine which classification is true
  //           const filename = object.filename;
  //           const classifications = this.classificationCSV(object.classification);
  //           return classifications.unshift(filename); // ["filename","true","false","false"]
  //         })
  //       );
  //     //export_selection_csv
  //     case 1:

  //   }
  //   return csvData
  // };
  DownloadData = ({ data }) => {
    this.setState({ downloadData: [] });
    return <CSVDownload data={data} />;
  };

  render() {
    const filters = this.props.filters;
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Export
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={this.exportCSVData(null)}>
              Export All to CSV
            </Dropdown.Item>
            <Dropdown.Item onClick={this.exportCSVData(filters)}>
              Export Selection to CSV
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {this.state.downloadData && (
          <DownloadData data={this.state.downloadData} />
        )}
      </>
    );
  }
}

export default ExportResults;
