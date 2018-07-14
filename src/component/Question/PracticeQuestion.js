import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./question.css";
import { apiGetQuestion } from "./../../codeUnravelApis.js";
import { apiDeleteQuestion } from "./../../codeUnravelApis.js";
import CodeCompileAndRun from "../Candidate/CodeCompileAndRun";

export default class PracticeQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allQuestion: "active",
      easy: "",
      medium: "",
      hard: "",
      alldata: [],
      filteredData: []
    };

    this.handleQuestionButtonClick = this.handleQuestionButtonClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
    this.handleComplexity = this.handleComplexity.bind(this);
    this.solveQuestion = this.solveQuestion.bind(this);
  }

  solveQuestion(questionId, event) {
    let question = this.state.alldata.filter(question => {
      return question.question_id == questionId;
    });
    this.props.attemptChallenge(question);
  }

  handleDeleteClick(id, e) {
    apiDeleteQuestion(id);

    console.log(this.state.alldata);
    this.setState(
      {
        filteredData: this.state.filteredData.filter(question => {
          return question.question_id != id;
        })
      },
      () => {}
    );
  }

  handleQuestionButtonClick = e => {
    this.setState({
      allQuestion: "",
      easy: "",
      medium: "",
      hard: ""
    });

    this.setState({ [e]: "active" });
    let complexity_level;
    let filtered;
    if ([e] == "easy") {
      complexity_level = 1;
    }
    if ([e] == "medium") {
      complexity_level = 2;
    }
    if ([e] == "hard") {
      complexity_level = 3;
    }
    if ([e] == "allQuestion") {
      complexity_level = 4;
    }
    if (complexity_level < 4 && complexity_level != null) {
      filtered = this.state.alldata.filter(question => {
        return question["complexity_level"] === complexity_level;
      });
    } else {
      filtered = this.state.alldata.filter(question => {
        return question;
      });
    }
    this.setState({
      filteredData: filtered
    });
  };

  getQuestion(){
    apiGetQuestion()
    .then(data=> {
      
   let challengeobj=data.filter((item)=>{
if(item.Practice==1){
  return item;
}
});
        this.setState({
          alldata: challengeobj,
          filteredData:challengeobj
      });
  
     })
    .catch(() => {
        alert("Question fetch failed")
    });
  }
  handleComplexity(complexity) {
    let complexity_level;
    if (complexity == 1) complexity_level = "Easy";
    if (complexity == 2) complexity_level = "Medium";
    if (complexity == 3) complexity_level = "Hard";
    return complexity_level;
  }
  handleEditClick(question, event) {
    this.props.history.push({
      pathname: "/create-question",
      state: {
        question: this.question
      }
    });
  }

  componentDidMount() {
    console.log("ashja");
    this.getQuestion();
  }

  render() {
    const styleInButton = {
      background: "linear-gradient(30deg, blue 90%, blue 90%)",
      borderRadius: 4,
      border: "5px",
      color: "white",
      height: "5px",
      background: "blue",
      boxShadow: "0px 1px 9px rgb(38, 38, 38)"
    };

    return (
      <div id="practice-question-mainDiv">
        <div className="view-question-grid">
          <div className="Question-buttons">
            <button
              name="allQuestion"
              className={this.state.allQuestion}
              onClick={() => {
                this.handleQuestionButtonClick("allQuestion");
              }}>
              All Question
            </button>
            <button
              name="easy"
              className={this.state.easy}
              onClick={() => {
                this.handleQuestionButtonClick("easy");
              }}>
              Easy
            </button>
            <button
              name="medium"
              className={this.state.medium}
              onClick={() => {
                this.handleQuestionButtonClick("medium");
              }}>
              Medium
            </button>
            <button
              name="hard"
              className={this.state.hard}
              onClick={() => {
                this.handleQuestionButtonClick("hard");
              }}>
              Hard
            </button>
          </div>
          <div className="navba" />
          <div className="question-render">
            <div className="" id="navbar-grid">
              <div> Serial No.</div>
              <div>Question</div>
              <div>Difficulty Level</div>
              <div>Creation Date</div>
              <div>Max Score</div>
              <div>Solve</div>
            </div>
            <div id="question-container-height">
              {this.state.filteredData.map((question, index) => {
                return (
                  <div className="Questions-div">
                    <div>{index + 1}</div>
                    <div>{question.title}</div>
                    <div>
                      {this.handleComplexity(question.complexity_level)}
                    </div>
                    <div>{question.creation_date}</div>
                    <div>{question.max_Score}</div>
                    <div>
                      <Button
                        style={styleInButton}
                        value={question.question_id}
                        onClick={this.solveQuestion.bind(
                          this,
                          question.question_id
                        )}>
                        Solve
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
