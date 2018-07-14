import React, { Component } from 'react';
import './login.css';
import SignUpLogInHeader from '../SignUpLogInHeader/signUpHeader'
import Footer from '../Footer/footer.js';
import {NavLink} from 'react-router-dom'; 
import {apiLogIn} from './../../codeUnravelApis.js';
import 'font-awesome/css/font-awesome.min.css';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {emailId: '', password:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
      }

login(UserObj){
     apiLogIn(UserObj)
     .then(data => {
   if(data.login_token!=""){
    localStorage.setItem("loginObject",JSON.stringify(data));
   if(data.role=='recruiter'){
    this.props.history.push({
        pathname: "/recruiter-dashboard",
        state: {
          user: data
        }
      });
  }else if(data.role=='candidate'){
    this.props.history.push({
        pathname: "/candidate-dashboard",
        state: {
          user: data
        }
      });
   }else if(data.role=='admin'){
    this.props.history.push({
        pathname: "/admin-dashboard",
        state: {
          user: data
        }
      });
   }else{
    this.props.history.push("/");
   }
}
    })
    .catch(() => {
        alert("User Name Or Password Wrong")
    });
 }


 handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

handleSubmit(event) {
    event.preventDefault();
    let UserObj={
            email: this.state.emailId,
            password:this.state.password ,   
    };
    this.login(UserObj)
    }    

  render() {
    return (
        <div>
        <div className="login-page-content">
            <div className="login-page-background" >
            <SignUpLogInHeader/>
                <div className="login-signup-input-box">
                <div className="login-signup"> <h2>Log In</h2> 
                    <div className="login-header">
                        <NavLink to = "/signup" style={{ textDecoration: 'none' }} className="inactive" activeClassName="active">
                        <div><h2>Sign Up</h2></div>
                        </NavLink>
                    </div>
                </div>
                    <form className="login-signup-form" onSubmit={this.handleSubmit}>  
                            <div className="icon-inputfield-grid"><i id="icons" class="fa fa-envelope fa-2x">
                            </i><input className="homeClass" type="Email" name="emailId" value={this.state.emailId} id="emaillogin" onChange={this.handleChange} placeholder="Email" required/>
                            </div>
                    
                            <div className="icon-inputfield-grid">
                            <i id="icons" class="fa fa-lock fa-3x"></i>
                            <input className="homeClass" type="password" name="password" value={this.state.password} id="passwordlogin" onChange={this.handleChange} placeholder="Password" required/>
                            </div>
                        
                            <div><input className="login-buttons" type="submit" value="Log In"/></div>
                    </form> 
                </div>
            </div>
        </div> 
            <div><Footer/></div>
        </div>
    );
  }
}









