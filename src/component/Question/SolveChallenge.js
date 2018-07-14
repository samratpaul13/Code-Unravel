import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./solveQuestion.css";
import { apiGetQuestion } from "./../../codeUnravelApis.js";
import { apiDeleteQuestion } from "./../../codeUnravelApis.js";
export default class SolveChallenge extends Component {
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
    if (window.confirm("Are you ready for Attend Challenges")) {
      let question = this.state.alldata.filter(question => {
        return question.question_id === questionId;
      });
      this.props.solveChallenge(question);
    }
  }

  handleDeleteClick(id, e) {
    apiDeleteQuestion(id);
    console.log(this.state.alldata);
    this.setState(
      {
        filteredData: this.state.filteredData.filter(question => {
          return question.question_id !== id;
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
        return question["complexity_level"] == complexity_level;
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

  getQuestion() {
    apiGetQuestion()
      .then(data => {
        let challengeobj = data.filter(item => {
          if (item.Practice == 0) {
            return item;
          }
        });
        this.setState({
          alldata: challengeobj,
          filteredData: challengeobj
        });
      })
      .catch(() => {
        alert("Questions not fetched");
      });
  }
  handleComplexity(complexity) {
    let complexity_level;
    if (complexity === 1) complexity_level = "Easy";
    if (complexity === 2) complexity_level = "Medium";
    if (complexity === 3) complexity_level = "Hard";
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
    this.getQuestion();
  }

  render() {
    const styleInButton = {
      background: "linear-gradient(30deg, blue 90%, blue 90%)",
      borderRadius: 4,
      border: "5px",
      color: "white",
      height: "40px",
      boxShadow: "0px 1px 9px rgb(38, 38, 38)"
    };
    return (
      <div id="solveChallengeMainDiv">
        <div className="view-question-grid">
          <div className="Question-buttons">
            <button
              name="allQuestion"
              className={this.state.allQuestion}
              onClick={() => {
                this.handleQuestionButtonClick("allQuestion");
              }} >
              All Question
            </button>

            <button
              name="easy"
              className={this.state.easy}
              onClick={() => {
                this.handleQuestionButtonClick("easy");
              }}>
              {" "}
              Easy
            </button>

            <button
              name="medium"
              className={this.state.medium}
              onClick={() => {
                this.handleQuestionButtonClick("medium");
              }}
            >
              {" "}
              Medium
            </button>

            <button
              name="hard"
              className={this.state.hard}
              onClick={() => {
                this.handleQuestionButtonClick("hard");
              }}
            >
              {" "}
              Hard
            </button>
          </div>
          <div className="navba" />
          <div className="Solve-question-render">
            <div className="Solve-Questions-div">
              <div> Serial No.</div>
              <div>Question</div>
              <div>Difficulty Level</div>
              <div>Creation Date</div>
              <div>Max Score</div>
              <div>Solve</div>
            </div>
            <div id="view-question-overflow">

              {this.state.filteredData.map((question, index) => {
                return (
                  <div className="Questions-div">
                    <div>{index + 1}</div>
                    <div>{question.title}</div>
                    <div>
                      {this.handleComplexity(question.complexity_level)}
                    </div>
                    <div>{question.creation_date}</div>
                    <div>
                      {question.max_Score}
                    </div>
                    <div>
                      <Button
                        style={styleInButton}
                        value={question.question_id}
                        onClick={this.solveQuestion.bind(
                          this,
                          question.question_id
                        )}>
                        Solve Challenge
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
