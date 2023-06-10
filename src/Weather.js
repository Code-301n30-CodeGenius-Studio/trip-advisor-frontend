import React from "react";
import Accordion from 'react-bootstrap/Accordion';

class Weather extends React.Component {

render() {
  return(
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header></Accordion.Header>
          <Accordion.Body></Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  )
}
}



export default Weather;