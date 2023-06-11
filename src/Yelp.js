import React from "react";
import Accordion from 'react-bootstrap/Accordion';

class Yelp extends React.Component {


  render() {
    return(
        <div>
           <Accordion>
            <Accordion.Item>
              <Accordion.Header></Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            </Accordion> 
        </div>
    )
  }
}


export default Yelp;