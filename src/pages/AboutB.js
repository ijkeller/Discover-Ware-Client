import { Component } from "react";
import Card from "react-bootstrap/Card";
import './About.css';
import Data from '../assets/personalinfo.json';

class About extends Component {

  render() {
    return (
      <div className="about-container" >
        {Data.map((person, idx) => {
          return (
            <Card className="card" key={idx} >
              <Card.Img variant="top" src={person.personImg} alt={`${person.personName} img`} />
              <Card.Body>
                <Card.Title className="title">{person.personName}</Card.Title>
                <Card.Text className="bio">{person.personData}</Card.Text>
              </Card.Body>
            </Card>)
        })}
      </div>
    );
  }
}

export default About;
