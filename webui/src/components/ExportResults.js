import React from 'react';
import { Button } from 'react-bootstrap';
class ExportResults extends React.Component {
    handleClick() {
        console.log('this is:', this);
      }
    
      render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <div>
                <button id="exportButton" type="button" onClick={() => this.handleClick()}>
                    Export
                </button>
          </div>
          
        );
      }
}

export default ExportResults;