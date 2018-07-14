import React, { Component } from 'react';
import './signup.css';
import SignUpLogInHeader from '../SignUpLogInHeader/signUpHeader'
import Footer from '../Footer/footer.js';
import {NavLink} from 'react-router-dom';
import {apiSignup} from './../../codeUnravelApis.js';
import 'font-awesome/css/font-awesome.min.css';

class Signup extends Component {
    constructor () {
        super();
        this.state = {
          Company:"",
          Name: "",
          Email: '',
          Phone:'',
          Password:'',
          Role:'',
          LogInAs:'',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signup=this.signup.bind(this);
        this.handleSignUpAsChange=this.handleSignUpAsChange.bind(this);
        this.handleCompanyChange=this.handleCompanyChange.bind(this);
    }

 signup(UserObj){
    apiSignup(UserObj)
    .then((userResponse) => {
            alert("Sign Up successfull")
            this.props.history.push(
            {pathname:"/login"}
       )
             
    })
    .catch(() => {
        alert("fail")
    })
}
handleCompanyChange(evt) {
    this.setState({ Company:evt.target.value});
  }

handleNameChange (evt) {
    this.setState({ Name:evt.target.value});
  }
handleEmailChange (evt) {
this.setState({ Email: evt.target.value });
}
handlePhoneChange (evt) {
    this.setState({ Phone: evt.target.value });
}
handlePasswordChange (evt) {
    this.setState({  Password: evt.target.value });
}
handleSubmit(event) {
    event.preventDefault();
    let UserObj={
          name: this.state.Name,
          email:this.state.Email,
          phone_no:this.state.Phone,
          password:this.state.Password,
          company_name:(this.state.Company)?this.state.Company:null,
          role:this.state.Role,
    };

    this.signup(UserObj)
  }

  handleSignUpAsChange(e) {
    this.setState({ Role:( e.target.value==="Recruiter")?2:3 })    
  }

  render() {
      let temp;
    return (
        <div>
        
        <div className="signup-page-content">
            <div className="signup-page-background" >
           <div className="headers"> <SignUpLogInHeader/></div>
                <div className="signup-input-box">
                <div className="login-signup-nav">
                <div className="login-header">
                <NavLink to = "/login" className="inactive" activeClassName="active" activeStyle={{ textDecoration: 'none',background:'transparent',borderBottomColor:'transparent'}} > 
                <h2>Log In</h2> 
                </NavLink>
                </div>
                <div><h2>Sign Up</h2></div></div>

                
               <div className="signup-form">
                <form onSubmit={this.handleSubmit}>          
                    <select  onClick={this.handleSignUpAsChange} required>
                    <option value="" selected disabled hidden>Sign Up As</option>
                    <option value="Candidate">Candidate</option>
                    <option value="Recruiter">Recruiter</option>
                    </select>
                    { (this.state.Role === 2)? 
                       <div className="icon-inputfield-grid"><div> <i id="icons" class="fa fa-building fa-2x"></i></div><input className="company-name" value={this.state.value} onChange={this.handleCompanyChange} type="text" placeholder="Company Name" value={this.state.value} onChange={this.handleCompanyChange}/></div>
                        : <div><input type="hidden" /></div> 
                    }

                       <div className="icon-inputfield-grid"> <i id="icons" class="fa fa-user fa-2x"></i>
                        <input className="homeClass"  value={this.state.value} onChange={this.handleNameChange} type="Name" name="Name" placeholder="Name" required/> </div>
                  
                        <div className="icon-inputfield-grid">
                        <i id="icons" class="fa fa-envelope fa-2x"></i>
                        <input className="homeClass" value={this.state.value} onChange={this.handleEmailChange} type="Email" name="Email" placeholder="Email" required/>
                        </div>

                      
                       <div className="icon-inputfield-grid">
                        <i id="icons" class="fa fa-phone fa-2x"></i>
                        <input className="homeClass" value={this.state.value} onChange={this.handlePhoneChange} type="tel" name="Phone" placeholder="Phone" autocomplete="disabled" pattern="^\d{4}-\d{3}-\d{4}$" required />
                        </div>
                      
                    
                       <div className="icon-inputfield-grid">
                        <i id="icons" class="fa fa-lock fa-2x"></i>
                        <input className="homeClass"  value={this.state.value} onChange={this.handlePasswordChange} type="password" name="Password" autocomplete="disabled" placeholder="Password" required/>
                        </div>
                      
                      
                       <input className="signup-button" type="submit" value="Sign Up" />   
                </form>
                </div>
                </div>
            </div>  
        </div>
        <div><Footer/></div>
    </div>
   
    );
  }
}

export default Signup;




