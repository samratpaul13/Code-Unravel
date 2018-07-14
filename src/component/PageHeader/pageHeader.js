import React, { Component } from 'react';
// import '../HomeHeader/homeHeader.css';
// import './../App.css';
import {NavLink} from 'react-router-dom';  
import './pageHeader.css';
import { GoogleLogout } from 'react-google-login';
export default class PageHeader extends Component {

  constructor(props){
    super(props);
    this.state = { isLoggedIn: "" }
}
  render() {

    const logout = (response) => {
      console.log(response);
        alert("jk")
    //   let UserObj={
    //       name: response.w3.ig,
    //       email:response.w3.U3,
    //       phone_no:"123456789",
    //       password:"9090909090",
    //       company_name:(this.state.Company)?this.state.Company:null,
    //       role:'3',
    // };    
    // this.signup(UserObj)
    }
    return (
      <div className="page-header-position">
      <div className="page-header">
        <div className="page-logo" 
        style={{ width: 50, height: 50, backgroundImage: 'url("https://image.flaticon.com/icons/svg/752/752689.svg")' }}>
        </div>

        <div><h1 className="page-title">Code Unravel </h1></div>
  <div></div>
  <div className="user-name"><div className="user-text-decoraton">Hello!!</div>
  <div className="user-text-decoraton"><strong><i>
  {this.props.users.name}
  </i></strong></div></div>
      {/* <NavLink to = "/signup" className = "close-search"> <div>  <button type="button" className="square_btn">Sign Up</button></div></NavLink> */}
    <NavLink to = "/login" className = "close-search"> <div> <button type="button" className="page-square_btn">Log Out</button> {localStorage.clear()}</div></NavLink>
    
    {/* <GoogleLogout 
             clientId="558246897112-iqr68phibob5qr1sleactrv33c7dqoqm.apps.googleusercontent.com"
              buttonText="Logout" 
              onLogoutSuccess={(response) => { this.setState(()=>{return { isLoggedIn: "false" } } ) } } >
            </GoogleLogout> */}

      </div>
    </div>
    );
  }
}

// export default Header;





