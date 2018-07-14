import React, { Component } from 'react';
import Footer from '../Footer/footer.js';
import PageHeader from '../PageHeader/pageHeader'
import CreateQuestion from '../Question/CreateQuestion.js';
import EditQuestion from '../Question/editQuestion.js';
import ViewQuestion from '../Question/view-question.js';
import AssignChallenge from '../AssignChallenge/AssignChallenge'
import './sidenav.css';
import QuestionDetails from '../Question/QuestionDetails.js';

export default class SideNav extends Component {
    constructor(props){
        super(props);
        let user='';
        if(this.props.location.state!==undefined){
         user=this.props.location.state.user
        }

        this.state={
            sideBarList:['Create A Question','View Questions','Assign Challenge'],
            board:<CreateQuestion user={user}/>,
            CreateAQuestion:"active",
            ViewQuestion:'',
            userObj:user,
            AssignChallenge:'',
        };
       
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
    }

    handleClick = (e) => {
        this.setState({  
             CreateAQuestion:'',
             ViewQuestion:'',
             AssignChallenge:'',
                 });
        this.setState({ [e.target.name]: "active" });


        if([e.target.name]=='CreateAQuestion'){
        this.setState({
            board:<CreateQuestion user={this.props.location.state.user}/>,
        });
        }else if([e.target.name]=='ViewQuestion'){
            this.setState({
                board:<ViewQuestion user={this.state.userObj} editQuestion={this.editQuestion.bind(this)} viewDetailQuestions={this.viewDetailQuestions.bind(this)}/>
        });
        }else if([e.target.name]=='AssignChallenge'){
            this.setState({
                board:<AssignChallenge user={this.state.userObj}/>,
        });
        }
}

editQuestion(question,status){
    this.setState({
       board:<EditQuestion question={question} status={status}/>,
  })
}

viewDetailQuestions(question){
    this.setState({
        board:<QuestionDetails question={question}/>, 
    })
}


  render() {
   
    return (
        <div className="recruiter-dashb">               
           <PageHeader users={this.state.userObj}/>               
        <div className="sideNavList">
            <ol className="navList"> 
                <div>
               <button name="CreateAQuestion" 
                              className={this.state.CreateAQuestion}
                              onClick={this.handleClick}>
                              Create A Question
               </button>
               </div>
               <div>
               <button name="ViewQuestion"
                              className={this.state.ViewQuestion}
                              onClick={this.handleClick}>
                              View Questions
                            
               </button>
               </div>
               <div>
               <button name="AssignChallenge"
                              className={this.state.AssignChallenge}
                              onClick={this.handleClick}> 
                              Assign Challenge
               </button>
               </div>
            </ol> 
            <div className="dashboard-right">
            {this.state.board}
            </div>
        </div>
        {/* <Footer/> */}
        </div>
   );  
  }
}


