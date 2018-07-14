import React, { Component } from 'react';
import './signUpHeader.css';
import {NavLink} from 'react-router-dom';  

export default class SignUpLogInHeader extends Component {
  render() {
    return (
        <div className="sign-header-position">
        <div className="sign-header">
        <NavLink   to = "/" className="tags" activeStyle={{ textDecoration: 'none',background:'transparent',borderBottomColor:'transparent'}}>  
        <div id="sign-logo" 
        style={{ width: 50, height: 50, backgroundImage: 'url("https://image.flaticon.com/icons/svg/752/752689.svg")' }}>
        </div>
        </NavLink>
        <div id="header-name"><div><h1>Code Unravel </h1></div></div>
        <div></div>
        <div></div>

       {/* <div> <button
        className="btn btn-default"
        // style={buttonStyle}
        onClick={this.props.handleClick}>{this.props.label}</button></div> */}
       
        {/* <div> <button type="button">Log In</button></div> */}


        </div>
        </div>
    );
  }
}





