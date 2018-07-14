import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './question.css';
import {apiGetQuestion} from './../../codeUnravelApis.js';
import {apiDeleteQuestion} from './../../codeUnravelApis.js';


export default class ViewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
          allQuestion:"active",
          easy:'',
          medium:'',
          hard:'',
          alldata:[],
          filteredData:[]
        };
        
        this.handleQuestionButtonClick =this.handleQuestionButtonClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.getQuestion =this.getQuestion.bind(this);
        this.handleComplexity=this.handleComplexity.bind(this);
        this.handleEditClick=this.handleEditClick.bind(this);
        this.handleViewTitleClick=this.handleViewTitleClick.bind(this);
      }
    
      handleEditClick(question,e){
        e.preventDefault(true);
        e.stopPropagation();
        let status=true;
        this.props.editQuestion(question,status);
      }
      handleViewTitleClick(question,e){
        this.props.viewDetailQuestions(question);
        e.preventDefault();
      }

      handleDeleteClick (id,e){
        e.preventDefault(true);
        e.stopPropagation();
        e.preventDefault();
          apiDeleteQuestion(id)
            this.setState({
              filteredData:this.state.filteredData.filter((question) => {return question.question_id!=id})
              
            });
 }

      handleQuestionButtonClick = (e) => { 
        this.setState({  allQuestion: "",
        easy:"",
        medium:'',
        hard:'',
      });

        this.setState({ [e]: "active" });
         let complexity_level
         let filtered
          if([e]=='easy'){
            complexity_level=1
          }
          if([e]=='medium'){
            complexity_level=2
          }
          if([e]=='hard'){
            complexity_level=3
          }
          if([e]=='allQuestion'){
            complexity_level=4  
            }
          if(complexity_level<4 && complexity_level!=null){
                filtered = this.state.alldata.filter((question) => {return question['complexity_level']===complexity_level});
             }
         else{
                filtered = this.state.alldata.filter((question) => {return question});
              }
        this.setState({
            filteredData: filtered,
           })
      } 

    getQuestion(){
      apiGetQuestion()
      .then(data=> {
          this.setState({
            alldata: data,
            filteredData:data
        })
       })
      .catch(() => {
          alert("get question fail")
      });
      
    }
    handleComplexity(complexity){
      let complexity_level
      if(complexity==1)
      complexity_level="Easy"
      if(complexity==2)
      complexity_level="Medium"
      if(complexity==3)
      complexity_level="Hard"
         return complexity_level
    }
   
    componentDidMount(){
     this.getQuestion();
    }
    
    
  render() {
    
      const styleInButton = {
        background: 'linear-gradient(30deg, blue 90%, blue 90%)',
        borderRadius: 4,
        border: '5px',
        color: 'white',
        height: '5px',
        background:'blue',
        boxShadow: '0px 1px 9px rgb(38, 38, 38)',
      };
     
    
    return (
        <div id="question-container">
          <div id="view-question-container">
                <div className="Question-buttons">
                            <button name="allQuestion"
                              className={this.state.allQuestion}
                              onClick={()=>{this.handleQuestionButtonClick('allQuestion')}}>All Question</button>
                          
                          <button name="easy"
                              className={this.state.easy}
                              onClick={()=>{this.handleQuestionButtonClick('easy')}}> Easy</button>
                          
                          <button name="medium"
                              className={this.state.medium}
                              onClick={()=>{this.handleQuestionButtonClick('medium')}}> Medium</button>
                          
                          <button name="hard"
                              className={this.state.hard}
                              onClick={()=>{this.handleQuestionButtonClick('hard')}}> Hard</button>
              
               </div>
               <div className="navba"> </div>
               <div className="question-render">
                    <div className="" id="navbar-grid">
                        <div> Serial No.</div>
                        <div>Question</div>
                        <div>Difficulty Level</div>
                        <div>Creation Date</div>
                        <div>Edit</div>
                        <div>Delete</div>
                    </div>
                    <div id="question-container-height">
                        {this.state.filteredData.map((question,index)=>{
                          
                          return(
                            <div className="Questions-div" onClick={this.handleViewTitleClick.bind(this,question)} >
                                <div>
                                  {index+1}
                                </div>
                                <div>
                                <div><button name="question-title-view" 
                                  type="submit" value="title"id="question-title-view">{question.title}</button></div>
                                </div>
                                <div>
                                  
                                  {this.handleComplexity(question.complexity_level)}
                                </div>
                                <div>
                                        {question.creation_date}
                                </div>
                                <div>
                                <Button style={styleInButton}
                                onClick={this.handleEditClick.bind(this,question)}>Edit</Button>
                                </div>
                                <div>
                                <Button style={styleInButton}
                                onClick={this.handleDeleteClick.bind(this,question.question_id)}>Delete</Button>
                                </div>
                          </div>
                          )
                            })}
                    </div>      
               </div>
           </div>    
       </div>
    );
  }
}




