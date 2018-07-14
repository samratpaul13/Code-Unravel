import React, { Component } from 'react';
import HomeHeader from '../HomeHeader/homeheader';
import './home.css';
import {apiLogIn} from './../../codeUnravelApis.js';
import 'font-awesome/css/font-awesome.min.css';
import GoogleLogin from 'react-google-login';
import {apiSignup} from './../../codeUnravelApis.js';
export default class Body extends Component {
    constructor(props)
    {
        super(props);
        this.state = {emailId: '', password:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.signup=this.signup.bind(this);
    }

login(UserObj){
    apiLogIn(UserObj)
    .then(data => {
        alert("Log in successful")
       if(data.login_token!=="") 
       {
        localStorage.setItem("loginObject",JSON.stringify(data));
       if(data.role==='recruiter')
       {
        this.props.history.push({
            pathname: "/recruiter-dashboard",
            state: { user: data}
          });
      }
      else if(data.role==='candidate')
      {
        this.props.history.push({
            pathname: "/candidate-dashboard",
            state: {user: data}
          });
       }
       else if(data.role==='admin')
       {
        this.props.history.push({
            pathname: "/admin-dashboard",
            state: {user: data}
          });
       }
       else
       {
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
        console.log("inside handle submit")
        console.log(this.state.emailId);
        event.preventDefault();
        let UserObj={
              email: this.state.emailId,
              password:this.state.password ,   
        };
        this.login(UserObj)
         }    
signup(UserObj){
apiSignup(UserObj)
.then((userResponse) => {
        // alert("Log In successfull")
        console.log(userResponse)
    let UserOb={
        email:UserObj.email,
        password:UserObj.password,   
  };
  this.login(UserOb)
  
})
.catch(() => {
    alert("fail")
})
}

render() {
    const responseGoogle = (response) => {
        console.log(response);
        var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
        let UserObj={
            name: response.w3.ig,
            email:response.w3.U3,
            phone_no:"",
            password:"123",
            company_name:(this.state.Company)?this.state.Company:null,
            role:'3',
           
      };  
      alert(JSON.stringify(UserObj))
      this.signup(UserObj)
      }
    return (
        <div className="page-content">
          <div className="home-page-background" >
            <HomeHeader/>
                <div className="login-input-box">  
                             
                <form className="login-form-outer"  onSubmit={this.handleSubmit} >
                <div className="loninClass"><h1>Log In</h1> </div>
                       
                         <div className="icon-inputfield-grid">
                            <i id="icons" class="fa fa-envelope fa-2x"></i>
                            <input className="homeClass"type="Email" name="emailId" value={this.state.emailId} id="emaillogin" onChange={this.handleChange} placeholder="Email" required/> 
                         </div>
                       
                         <div className="icon-inputfield-grid">
                            <i id="icons" class="fa fa-lock fa-3x"></i>
                            <input className="homeClass" type="password" name="password" value={this.state.password} id="passwordlogin" onChange={this.handleChange} placeholder="Password"  placeholder="Password" required/>
                         </div>
                       
                         <div><input className="homesubmitbutton" type="submit" value="Log In & Start Coding" /></div>
                       
                         <div className="seperator_line"></div>
                       
                         <div>Or Log In with :</div>
                    
                         <div> 
                            <GoogleLogin
                                    clientId="558246897112-iqr68phibob5qr1sleactrv33c7dqoqm.apps.googleusercontent.com"
                                    // buttonText="Login"
                                    style={{ width: 50, height: 30 }}
                                    tag="div"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                >
                                <div id="googleicon">
                                <i class="fa fa-google-plus fa-2x"></i>
                                </div>
                            </GoogleLogin>
                      </div>
                </form>
               </div>
            </div>  
        </div>
    );
  }
}





