import { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';
import './About.css';
import Data from '../assets/personalinfo.json';

class About extends Component {

  componentDidMount = () => {
    this.props.disablePlaces();
  }

  render() {
    return (
      <>
        <div className="about-container" >
          {Data.map((person, idx) => {
            return (
              <>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{person.personName}</Accordion.Header>
                    <Accordion.Body>
                      <Card className="card" key={idx} >
                        <Card.Img variant="top" src={person.personImg} alt={`${person.personName} image`} />
                        <Card.Body>
                          <Card.Title className="title">{person.personName}</Card.Title>
                          <Card.Text className="bio">{person.personData}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                          <Card.Link href={person.linkedin}>LinkedIn</Card.Link>
                          <Card.Link href={person.github}>GitHub</Card.Link>
                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>)
          })}
        </div>
        <div className="abouPage">

        </div>
      </>
    );
  }
}

export default About;
