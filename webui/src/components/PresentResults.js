
import React from 'react';
import { Container, Row, Col, Card, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

//Presents grid of all images with filters for each classification at the top of the page.
class PresentResults extends React.Component {
    constructor(props){
        super(props);
        this.state={
            filters = new Set() // ["Custom 404", "Login Page", ...]
        }
    }
    render() {
        //Updates the filters when a ToggleButton is clicked
        const handleFilterToggle = (val) => {
            let currentFilters = this.state.filters;
            if(currentFilters.has(val)){
                currentFilters.delete(val);
            } else {
                currentFilters.add(val)
            }
            this.setState({filters: currentFilters})
        }

        const classifiedObjects = this.props.calssifiedObjects;

        return (
            <Container>
                <Row>
                    <Col>
                     <ToggleButtonGroup type="checkbox" value={value} onChange={handleFilterToggle}>
                        <ToggleButton value={"Custom 404"}>Custom 404</ToggleButton>
                        <ToggleButton value={"Login Page"}>Login Page</ToggleButton>
                        <ToggleButton value={"Homepage"}>Homepage</ToggleButton>
                        <ToggleButton value={"Old Looking"}>Old Looking</ToggleButton>
                    </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row>
                    {/* {classifiedObjects.filter(resultsFilter).map( object => <ImagePreview object={object} /> ) } */}
                    {classifiedObjects
                    .filter(object => {
                        const currentfilters = this.state.filters;
                        const currentClassification = object.classification;
                        if(currentfilters.has(currentClassification)){
                            return true;
                        }
                        return false;
                    })
                    .map( object => {
                        const img_src = object.imageURI;
                        return (
                            <Col sm={3}> 
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            {object.classification}
                                        </Card.Title>
                                    </Card.Body>
                                    <Card.Img src={img_src} bottom/>
                                </Card>
                            </Col>
                        )}
                    )}
                </Row>
            </Container>
        )
    }
    
}

const resultsFilter = (object) => {
    const currentfilters = this.state.filters;
    const currentClassification = object.classification;
    if(currentfilters.has(currentClassification)){
        return true;
    }
    return false;
}

class ImagePreview extends React.Component{
    render() {
        const object = this.props.object;
        return(
            <Col sm={3}> 
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {object.classification}
                        </Card.Title>
                    </Card.Body>
                    <Card.Img src={object.imageURI} bottom/>
                </Card>
            </Col>
        )
    }
}

export default PresentResults;