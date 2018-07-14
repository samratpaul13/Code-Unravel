import React, { Component } from 'react';
import './AssignChallenge.css';
import {apiAssignTask} from '../../codeUnravelApis'
import {apiSendEmail} from '../../codeUnravelApis'
class AC extends Component
{
    constructor()
    {
    super()
    this.state={

        question:'',
        users:'',
        questionclass:'hide',
        userclass:'hide',
        userList:[],
        questionList:[],
        assignTask:{
            status:1,
            assign_link:'http://www.abc.com',
            start_date:'',
            start_time:'',
            challenge_position:'',
            time_span:'',
            question_ids:'',
            challenge_position:'software engineer',
            recruiter:'',
            emails:''
                    },
                };
this.handleSubmit=this.handleSubmit.bind(this);
this.QuestionClick.bind(this);
this.userClick.bind(this);
               
    }
    
      

    componentWillMount(){
        console.log(this.props.user)
        let newState = Object.assign({}, this.state);
        newState.assignTask.recruiter = this.props.user.user_id;
        this.setState(newState);
        this.setState({userList:[]});
        this.setState({questionList:[]});
        var source=this;
        var result=fetch("http://127.0.0.1:8000/codeunravel/questions/")
        result.then(function(response) {
        return response.json();
        }).then(function (data) {
        console.log(data)
        source.setState({question:data})
        
      });
      
      var source=this;
        var candidates=[];
        var result=fetch("http://127.0.0.1:8000/codeunravel/users/")
        result.then(function(response) {
        return response.json();
        }).then(function (data) {
            data.forEach((user)=>{
                if(user['role']==3){
                    candidates.push(user)
                }

            })
        source.setState({users:candidates})
        
      });
      
    }
    
    userClick=(event)=>{
        if(event.target.checked)
        {
            this.setState({userclass:'user-input'})
            
        }
            
        else
        {
            this.setState({userclass:'hide'})  
            
        }   
    }
    QuestionClick=(event)=>{
       
        if(event.target.checked)
        {
            this.setState({questionclass:'form-data-scroll'})
        }
        else
        {
            this.setState({questionclass:'hide'})
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        var assignTaskObj=this.state.assignTask;
        assignTaskObj.user_emails=JSON.stringify(this.state.userList)
        assignTaskObj.question_ids=JSON.stringify(this.state.questionList)
        console.log(this.state.assignTask['emails'])
        var emails=this.state.assignTask['emails']
        var emailsList=emails.split(',')
        var contacts={
            emails:emailsList,
            startTime:this.state.assignTask.start_time,
            finishTime:this.state.assignTask.finish_time,
            startDate:this.state.assignTask.start_date,
            challenge_position:this.state.assignTask.challenge_position,
            time_span:this.state.assignTask.time_span,
            link:'http://localhost:3000',
            recruiter:this.state.assignTask.recruiter,
          
        }
       
        apiSendEmail(contacts)
            .then((response)=>{
                console.log("email send")
                apiAssignTask(assignTaskObj)
                .then(()=>{
                    console.log("sucess")
                    
                })
            })
        
        
    }
    
    questionSelect=(e)=>{
        var questionList_arr=this.state.questionList;
        if(e.target.checked)
        {
          
            questionList_arr.push(e.target.value)
            this.setState({questionList:questionList_arr})
            
        }
        else
        {
            var index=0;
            questionList_arr.forEach((element)=>{
                if(element===e.target.value)
                {
                    questionList_arr.splice(index,1);
                    this.setState({questionList:questionList_arr})
                    
    
                }
                index+=1;

            });
        }

    }

    userSelect=(e)=>{
        var userList_arr=this.state.userList;
        if(e.target.checked)
        {
            userList_arr.push(e.target.value)
            this.setState({userList:userList_arr})
         }
        else
        {
            var index=0;
            userList_arr.forEach((element)=>{
                if(element===e.target.value)
                {   
                    userList_arr.splice(index,1);
                    this.setState({userList:userList_arr})
                 }
                index+=1;
            });
        }

    }

    onChange = (e) => {
        var source=e;
        var assignTaskState=this.state.assignTask
        assignTaskState[source.target.name]=source.target.value
        this.setState({assignTask:assignTaskState})
     }
    

    render(){
        var question_arr=[];
        var user_arr=[];
       
        return(
            <div className="assign-task">
            <div className="button-area">

            <div className="ck-button">
             <label>
                 <input type="checkbox"  onChange={this.QuestionClick}/><span>Select Questions</span>
             </label>
            </div>
            <div className="ck-button">
                <label>
                    <input type="checkbox"  onChange={this.userClick}/><span>Select Candidates</span>
                </label>
            </div>
            
            </div>
            <form onSubmit={this.handleSubmit}>
                <div className={this.state.questionclass} >
                    <div className="question" >
                        {
                             Object.keys(this.state.question).forEach((key)=>{
                               question_arr.push(<div className="content-prop"><div className="content-alignment"><input type="checkbox" onChange={this.questionSelect} value={this.state.question[key]['question_id']} className="check-box"/></div><div className="content-alignment">{this.state.question[key]['question_description']}</div></div>)
                                })
                        }
                            {question_arr}
                        </div>
                    </div>
                <div className={this.state.userclass}>
                <textarea name="emails" onChange={this.onChange} rows="5" placeholder="Enter Comma Separated Candidate Email here(EX:-abc@gmail.com,def@gmail.com)" required>
                </textarea>
               
                </div>
                <div class="select-date" >  
                <div>
                <strong>Select Test Date</strong>
                    <input type="date" name="start_date" onChange={this.onChange} required/>
                </div>
                <div>
                <strong>Select Time Limit</strong>
                <select name="time_span" onChange={this.onChange} id="time" required>
                            <option selected="selected" value="">Select Time Limit</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hour</option>
                            <option value="120">2 hour</option>
                            </select>
                </div>
                </div>

                <div class="select-date">
                <div>
                <strong>Select Start Time</strong>
                <input type="time"  name="start_time" onChange={this.onChange} placeholder="Start Time" required/>
                </div>
                <div>
                <strong>Hiring Position</strong>
                <input type="text"  name="challenge_position" onChange={this.onChange} placeholder="Enter Hiring position" required/>
                </div>
                </div>

                <div className="submit-button">
                <div>
                </div>
                        <div>
                          <input type="submit" value="Assign Task" className="button-color"/>
                        </div>
                <div>
                </div>
                </div>
                </form>
                
            </div>
        );
    }
}
export default AC;