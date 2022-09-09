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
      <>
        <div className="about-container" >
          {Data.map((person, idx) => {
            return (
              <>
                <Card className="card" key={idx} >
                  <Card.Img variant="top" src={person.personImg} alt={`${person.personName} image`} />
                  <Card.Body>
                    <Card.Title className="title">{person.personName}</Card.Title>
                    <Card.Text className="bio">{person.personData}</Card.Text>
                    <Card.Link href={person.linkedin} className="linkedin">
                      <Icon icon="logos:linkedin-icon" />
                    </Card.Link>
                    <Card.Link href={person.github} className="github">
                      <Icon icon="icon-park:github" />
                    </Card.Link>
                  </Card.Body>
                </Card>
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
