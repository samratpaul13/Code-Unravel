import React, {Component} from 'react';
import './viewProfile.css';
import {NavLink} from 'react-router-dom';
// import {apiGetCandidate} from './../../codeUnravelApis.js';


class ViewProfile extends Component{
    constructor(props){
        super(props);
        this.state={          
            candidate:[]
        };

    }

componentDidMount(){
    console.log("in CDM")
//    this.getProfile();
var idObj={
    uid:this.props.user['user_id']
}

    fetch('http://127.0.0.1:8000/codeunravel/getcandidate/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(idObj)
  }).then(data => data.json())
  .then(data=>data)
  .then((data)=>{this.setState({candidate:data})})

  }

    render(){
        return(
           <div className="profile-page-container">
              <div className="picture-social">
                 <div><img src="https://bit.ly/2tHUwzv" id="user-image"/></div>
                  <div className="social-connect">
                      <div><h2></h2></div>
                      <div className="edit-profile">
                          {/* <div><button name="resume" type="submit" value="Resume"id="view-resume">View Resume</button></div>
                          <div><NavLink to="/candidate-details"><button name="edit" type="submit" value="profile-edit" id="profile-edit">Edit Profile</button></NavLink></div>
                          <div><button name="delete" type="submit" value="profile-delete" id="profile-delete">Delete Profile</button></div> */}
                      </div>
                  </div>
              </div>
              <div className="profile-details-box">
              <div className="profile-details-box-right">
                <div>Name</div>
                <div>Email</div>
                <div>Alternate Email</div>
                <div>Phone No.</div>
                <div>Gender</div>
                <div>Highest Qualification</div>
                <div>Institute</div>
                <div>Year of Passing</div>
                <div>Percentage</div>
                <div>Experience</div>
                <div>Current Location</div>
              </div>
              {this.state.candidate.map((data)=>{
                  return(
              <div className="profile-details-box-right">
             
              <div>{this.props.user.name}</div>
              <div>{this.props.user.email}</div>
              <div>alternate@email.com</div>
              <div>{this.props.user.phone_no}</div>
              <div>{data.gender}</div>
              <div>{data.qualification}</div>
              <div>{data.institute}</div>
              <div>{data.passout_year}</div>
              <div>{data.highest_percentage}</div>
              <div>{data.experience}</div>
              <div>{data.current_location}</div>
              </div>)
              }
              )}
             
              </div>
           </div> 
        );
    }

}

export default ViewProfile;