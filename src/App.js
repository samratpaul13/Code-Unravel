import React, { Component } from 'react';
import './App.css';
import Home from './component/Home/home.js'
import Result from './component/Result/result'
// import Header from './component/HomeHeader/header'
import Login from './component/login/login.js'
import Signup from './component/Signup/signup.js'; 
import ViewQuestion from './component/Question/view-question'
import CreateQuestion from './component/Question/CreateQuestion';
import { BrowserRouter, Route } from "react-router-dom"
import { Switch } from 'react-router'
import SideNav from './component/SideNav/sidenav';
import PageHeader from './component/Question/view-question'
import HomeHeader from './component/HomeHeader/homeheader'
import AC from './component/AssignChallenge/AssignChallenge';
import CandidateDashBoard from './component/Candidate/CandidateDashboard';
import CodeCompileAndRun from './component/Candidate/CodeCompileAndRun'
import CandidateDetails from './component/CandidateProfile/candidateDetails';
import ViewProfile from './component/CandidateProfile/viewProfile';
import QuestionDetails from './component/Question/QuestionDetails';
import AboutUs from './component/Footer/aboutUs';
import ContactUs from './component/Footer/contactUs';



class App extends Component {
  render() {
    return (
      
         <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home}/>
              {/* < Route path="/header" exact component={Header}/> */}
              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/recruiter-dashboard" exact component={SideNav}/>
              <Route path="/candidate-dashboard" exact component={CandidateDashBoard}/>
              <Route path="/view-question" exact component={ViewQuestion}/>
              <Route path="/create-question" exact component={CreateQuestion}/>
              <Route path="/pageHeader" exact component={PageHeader}/>
              <Route path="/homeheader" exact component={HomeHeader}/>
              <Route path="/assign-challenge" exact component={AC}/>
              <Route path="/candidate-details" exact component={CandidateDetails}/>
              <Route path="/candidate-profile" exact component={ViewProfile}/>
              <Route path="/question-details" exact component={QuestionDetails}/>
              {/* <Route path="/assign-challenge" exact component={AssignChallenge}/> */}
              <Route path="/code-compile-run" exact component={CodeCompileAndRun}/>
              <Route path="/about-us" exact component={AboutUs}/>
              <Route path="/contact-us" exact component={ContactUs}/>
              <Route path="/candidate-result" exact component={Result}/>
             
            </Switch>
         </BrowserRouter>
    );
  }
}

export default App;
