import React, { Component } from 'react';
import './homeheader.css';
import {NavLink} from 'react-router-dom';  
import Button from '@material-ui/core/Button';

export default class HomeHeader extends Component {
 
  render() {
    
    return (
        <div className="home-header-position">
          <div className="home-header">
              <NavLink   to = "/" className="tags" activeStyle={{ textDecoration: 'none',background:'transparent',borderBottomColor:'transparent'}}>  
                <div id="sign-logo" 
                style={{ width: 50, height: 50, backgroundImage: 'url("https://image.flaticon.com/icons/svg/752/752689.svg")' }}>
                </div>
              </NavLink>

                <div><h1>Code Unravel </h1></div>
                  <div></div>
              <NavLink to = "/signup" className = "close-search"> <div>  <button type="button" className="square_btn">Sign Up</button></div></NavLink>
              <NavLink to = "/login" className = "close-search"> <div> <button type="button" className="square_btn">Log In</button></div></NavLink>
          </div>
        </div>
    );
  }
}







