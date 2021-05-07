import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import ExportResults from "./ExportResults";

//Presents grid of all images with filters for each classification at the top of the page.
class PresentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [], // ["Custom 404", "Login Page", ...]
    };
  }

  resultsFilter = (object) => {
    const currentFilters = this.state.filters; // type []
    const objectClassifications = object.classification; // type Set
    if (currentFilters.length == 0) {
      // No filters => include everything.
      return true;
    }
    //Check if all the currentFilters are in the classifications of the object. If all are, filterFound = True
    const filterFound = currentFilters.every((filter) => {
      return objectClassifications.has(filter);
    })
    if (filterFound) {
      return true; //include the object
    }
    return false; //reject the object
  };
  //update filters to do intersection
  handleFilterToggle = (filters) => {
    this.setState({ filters: filters });
  };

  render() {
    const classifiedObjects = this.props.objects;
    // const filters = this.state.filters;
    let selectedObjects = classifiedObjects.filter(this.resultsFilter);
    return (
      <>
        <ExportResults selectedObjects={selectedObjects} />
        <Container>
          <Row>
            <Col>
              <ToggleButtonGroup
                type="checkbox"
                onChange={this.handleFilterToggle}
              >
                <ToggleButton value={"Custom 404"}>Custom 404</ToggleButton>
                <ToggleButton value={"Login Page"}>Login Page</ToggleButton>
                <ToggleButton value={"Homepage"}>Homepage</ToggleButton>
                <ToggleButton value={"Old Looking"}>Old Looking</ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
          <Row>
            {selectedObjects.map((object, index) => (
              <ImagePreview object={object} key={index} />
            ))}
          </Row>
        </Container>
      </>
    );
  }
}

class ImagePreview extends React.Component {
  //TODO allow user to blow up the image to see clearly.
  render() {
    const object = this.props.object;
    return (
      <Col sm={3}>
        <Card>
          <Card.Body>
            <Card.Title>{object.classification}</Card.Title>
          </Card.Body>
          <Card.Img src={object.imageURI} />
        </Card>
      </Col>
    );
  }
}

export default PresentResults;
