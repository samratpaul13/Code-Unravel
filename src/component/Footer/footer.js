import React from 'react';
import './Footer.css';
import {NavLink} from 'react-router-dom'; 


class Footer extends React.Component{
    render(){
        return(
            <div className="foot">
               <div></div> 
               <div className="links">
                <div><NavLink style={{ textDecoration: 'none', color:'white' }} to="/about-us"><h4 id="about-us"> About Us</h4></NavLink></div>            
                <div><NavLink style={{ textDecoration: 'none', color:'white' }} to="/contact-us"><h4 id="contact-us"> Contact Us</h4></NavLink></div>
               </div>
               <div></div>
            </div>
        )
    }     
}

export default Footer;