import { Component } from "react";
import Card from "react-bootstrap/Card";
import './About.css';
import Data from '../assets/personalinfo.json';
import { Icon } from '@iconify/react';

class About extends Component {

  componentDidMount = () => {
    this.props.disablePlaces();
  }

  render() {
    return (
      <div className="about-container" >
        {Data.map((person, idx) => {
          return (
            <Card className="card" key={idx} >
              <Card.Title className="title" >{person.personName}</Card.Title>
              <Card.Body className="cardBody">
                <Card.Img className="card-image" variant="top" src={person.personImg} alt={`${person.personName} image`} />
                <Card.Text className="bio">{person.personData}</Card.Text>
                <div className="link-container" >
                  <Card.Link href={person.linkedin} className="linkedin">
                    <Icon style={{ fontSize: '1.5rem' }} icon="logos:linkedin-icon" />
                  </Card.Link>
                  <Card.Link href={person.github} className="github">
                    <Icon style={{ fontSize: '1.5rem' }} icon="icon-park:github" />
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default About;
