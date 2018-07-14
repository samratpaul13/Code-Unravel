import React, { Component } from 'react';
import Footer from './footer';
import HomeHeader from '../HomeHeader/homeheader';
import './aboutUs.css';
import aboutImage from '../Footer/pp.png'
import 'font-awesome/css/font-awesome.min.css';

class AboutUs extends Component{
     render(){
         return(
             <div className="about-us-page">
                <div><HomeHeader/></div>
                <div className="about-us-head">
                 <h1>About Us</h1>
                </div>
                <div className="about-us-body">
                    <div><img src={aboutImage} id="group-photo"/></div>
                    <div className="about-us-para">
                        <p>This website is a pet project of group of four people coming together from
                        different backgrounds to work on a common idea of having a platform to showcase
                        ones coding ability irrespective of their educational background and enter the
                        field of web development.                           
                        </p>
                        <p>Seating from right to left is Nisha Narayan(MSc Physics), Nanda D Pradhan(MCA),
                        Himansu S Swain(MCA) and Samrat Paul(BE CS), constitute the team CODE UNRAVEL</p>
                        <p>If you are a company looking for a great hiring platform for great coders OR you
                            are a candidate looking for a platform for practice coding and get hired ......
                            THIS IS IT !!!!!! 
            
                        </p></div>
                </div>
                <div><Footer/></div>
             </div>
         )
     }
}
export default AboutUs;