import { Component } from "react";
// import Card from "react-bootstrap/Card"
import { ReactComponent as ProfileIcon } from '../svg/person-circle-svgrepo-com.svg';
import './About.css';
import Data from '../Assets/personalinfo.json'

class About extends Component {


  personImg = ProfileIcon
  

  render() {
    return (
      <div className="about-container" >
        {Data.map((person, idx) => {
          return(
          <div className="card" key={idx} >
            <h3 className="title">{person.personName}</h3>
            <ProfileIcon className="personal-pic" />
            <p className="bio">{person.personData}</p>
          </div>)
        })}
      </div>
    );
  }
}

export default About;
