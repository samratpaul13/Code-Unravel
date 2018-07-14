import React, { Component } from 'react';
import Footer from '../Footer/footer.js';
import PageHeader from '../PageHeader/pageHeader.js';
import CandidateDetails from '../CandidateProfile/candidateDetails';
import ViewProfile from '../CandidateProfile/viewProfile';
import PracticeQuestion  from '../Question/PracticeQuestion' 
import '../SideNav/sidenav.css';
import CodeCompileAndRun from '../Candidate/CodeCompileAndRun'
import SolveChallenge from '../Question/SolveChallenge'
class SideNav extends Component {
    constructor(props){
        super(props);
        let user='';
        if(this.props.location.state!=undefined){
         user=this.props.location.state.user
        }
        this.state={
            board:'',
            CreateProfile:"active",
            ViewProfile:'',
            PracticeQuestion:'',
            SolveChallenge:'',
            userObj:user,
            AssignChallenge:'',
        };
       
        this.attemptChallenge.bind(this);
    }

    handleClick = (e) => {

        this.setState({ CreateProfile:'',
        ViewProfile:'',
        PracticeQuestion:'',
        SolveChallenge:'',
            });
        
        this.setState({ [e.target.name]: "active" });
        if([e.target.name]=='CreateProfile'){
        this.setState({
            board:<CandidateDetails user={this.state.userObj}/>,
      });
    }else
    if([e.target.name]=='ViewProfile'){
        this.setState({
            board:<ViewProfile user={this.state.userObj}/>,
      });
    }else
    if([e.target.name]=='PracticeQuestion'){
        this.setState({
            board:<PracticeQuestion attemptChallenge={this.attemptChallenge.bind(this)}/>,
      });
    }
    else  if([e.target.name]=='SolveChallenge'){
        this.setState({
            board:<SolveChallenge solveChallenge={this.solveChallenge.bind(this)}/>,
      });
    }
    
}

attemptChallenge(question){
    this.setState({
        board:<CodeCompileAndRun question={question}/>
  })

}

solveChallenge(question){

    this.setState({
        board:<CodeCompileAndRun forChallenge="true" question={question}/>
  })
}
componentWillMount(){
    if(this.props.location.state!=undefined){
    this.setState({userObj:this.props.location.state.user })
    }
}

componentWillReceiveProps(){
    if(this.props.location.state!=undefined){
        this.setState({userObj:this.props.location.state.user })
        }
    }

componentDidMount(){
    
    console.log(this.state.userObj);
    try{
            if (this.props.location.state!=undefined){
                 if(this.props.location.state.user.login_token!==undefined && this.props.location.state.user.login_token!==""){
                 this.setState({userObj:this.props.location.state.user});
                
                }
                else{
                  this.props.history.push("/");
                    }
             }else{
                this.props.history.push("/");
                  }
       }catch(e){
        // this.props.history.push("/");
      } 
      this.setState({
        board:<CandidateDetails user={this.state.userObj}/>  
    })
    
}
  render() {
    return (
        <div>               
           <PageHeader users={this.state.userObj}/>               
        <div className="sideNavList">
            <ol className="navList"> 
               <button name="CreateProfile" 
                              className={this.state.CreateProfile}
                              onClick={this.handleClick}> Create Profile
               </button>
               <button name="ViewProfile"
                              className={this.state.ViewProfile}
                              onClick={this.handleClick}> View Profile
               </button>
               <button name="PracticeQuestion"
                              className={this.state.PracticeQuestion}
                              onClick={this.handleClick}> Practice Question
               </button>

               <button name="SolveChallenge"
                              className={this.state.SolveChallenge}
                              onClick={this.handleClick}> Solve Challenge
               </button>
            </ol> 
            {/* <CreateQuestion/> */}
            <div className="dashboard-right">
            {this.state.board}
            </div>
        </div>
        {/* <Footer/> */}
       
               
        </div>
        
    );  
  }
}
export default SideNav;