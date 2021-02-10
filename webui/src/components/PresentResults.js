
import React from 'react';
import { Container, Row, Col, Card, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

//Presents grid of all images with filters for each classification at the top of the page.
class PresentResults extends React.Component {
    constructor(props){
        super(props);
        this.state={
            filters : [] // ["Custom 404", "Login Page", ...]
        }
    }
    render() {
        //Updates the filters when a ToggleButton is clicked
        const handleFilterToggle = (filters) => {
            this.setState({filters: filters})
        }

        const classifiedObjects = this.props.objects;

        const resultsFilter = (object) => {
            const currentFilters = this.state.filters; // type []
            const objectClassifications = object.classification; // type Set
            if(currentFilters.length == 0){ // No filters => include everything.
                return true;
            }
            //Check if any of the currentFilters are in the classifications of the object. If any are, filterFound = True
            const filterFound = currentFilters.some( (filter) => {return objectClassifications.has(filter);})
            if(filterFound){
                return true; //include the object
            }
            return false; //reject the object
    }

        return (
            <Container>
                <Row>
                    <Col>
                     <ToggleButtonGroup type="checkbox" onChange={handleFilterToggle}>
                        <ToggleButton value={"Custom 404"}>Custom 404</ToggleButton>
                        <ToggleButton value={"Login Page"}>Login Page</ToggleButton>
                        <ToggleButton value={"Homepage"}>Homepage</ToggleButton>
                        <ToggleButton value={"Old Looking"}>Old Looking</ToggleButton>
                    </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row>
                    {classifiedObjects.filter(resultsFilter).map( object => <ImagePreview object={object} />) }
                </Row>
            </Container>
        )
    }
    
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
                    <Card.Img src={object.imageURI}/>
                </Card>
            </Col>
        )
    }
}

export default PresentResults;