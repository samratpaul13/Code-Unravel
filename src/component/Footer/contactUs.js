import React, { Component } from 'react';
import './contactUs.css';
import 'font-awesome/css/font-awesome.min.css';
import Footer from './footer';
import HomeHeader from '../HomeHeader/homeheader';

class ContactUs extends Component{
     render(){
         return(
            <div className="contact-us-page">
                <div><HomeHeader/></div>
                <div className="contact-us-head"><h2>Contact Us</h2></div>
                <div className="contact-us-body">
                    <div className="left-body">
                        <div><input type="text" name="name" placeholder="Name" required></input></div>
                        <div><input type="email" name="email" placeholder="Email"required></input></div>
                        <div><input type="tel" name="tel" placeholder="123-456-7890"></input></div>
                        <div><textarea rows="4" cols="50" name="message" placeholder="Your message here"></textarea></div>
                        <div><input type="submit" value="Send" className="send-button"></input></div>
                    </div>
                    <div className="right-body">
                        <div className="social-site">
                           <div><i class="fa fa-facebook-f fa-3x" id="fb"></i></div>
                           <div><i class="fa fa-twitter fa-3x" id="twit"></i></div>
                           <div><i class="fa fa-linkedin fa-3x" id="lin"></i></div>
                           <div><i class="fa fa-google fa-3x" id="goog"></i></div>
                        </div>
                        <div><h3>Code Unravel</h3>
                            <h4>Address: <div>91 Springboard,</div>
                                 <div>3rd, 4th Phase, JP Nagar,</div>
                                 <div>Dollars Colony, Bilekahalli,</div>
                                 <div>Ph. 080-12345678</div>
                                 <div>website:<span><i>www.codeunravel.com</i></span></div>
                                 <div>email:<span><i> codeunravel111@gmail.com</i></span></div>
                            </h4> 
                        </div>
                    </div>
                </div>
                <div><Footer/></div>
            </div>
         )
     }
}
export default ContactUs;