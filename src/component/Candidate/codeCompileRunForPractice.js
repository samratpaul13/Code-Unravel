import React, { Component } from "react";
import "./candidate.css";
import { apiCreateQuestion } from "../../codeUnravelApis";
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/jsx";
import { apiCompile, apiRun, getLanguages } from "../../codeUnravelApis";
import "brace/ext/language_tools";
import "brace/ext/searchbox";
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`brace/mode/${lang}`);
  require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
  require(`brace/theme/${theme}`);
});

class CodeCompileAndRunForPractice extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      newValue: "",
      lanuages: [],
      modeValue: "python",
      language_id: "",
      output: "",
      testcaseoutput:'',
      sampleMark:'',
      inputData: "",
      outputWindow: "output-window",
      buttonenabled: false,
      buttonValue: "Compile and Run",
      compileRunButton: "compile-run",
      time: {},
      seconds: 7200,
      Question: {
        title: "N-Queens",
        question_description:
          "Given a chess board having  N X N cells, you need to place N queens on the board in such a way that no queen attacks any other queen.",
        input_format:
          "The only line of input consists of a single integer denoting N.",
        output_format:
          'If it is possible to place all the N queens in such a way that no queen attacks another queen, then print N lines having N integers. The integer in  line and  column will denote the cell  of the board and should be 1 if a queen is placed at  otherwise 0. If there are more than way of placing queens print any of them. If it is not possible to place all N queens in the desired way, then print "Not possible" (without quotes).',
        constraints: "",
        sample_input: "",
        sample_ouptut: "",
        testcase_input: "",
        testcase_output: "",
        total_test_cases: ""
      }
    };

    this.codeCompileHandler.bind(this);
    this.onLanguageChangeHandler.bind(this);
    this.onInputChanges.bind(this);
    this.onRequestFullScreen.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timer = 0;
    this.changeTestCasePassedView.bind(this);
    // this.sampleMark='',
    this.createTestCases.bind(this);
  }

  componentWillMount() {
    this.setState({ Question: this.props.question[0] });
  }
  componentDidMount() {
    getLanguages().then(data => {
      this.setState({ lanuages: data });
      // this.setState({Question:this.props.question});
    });

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  onInputChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange(newValue) {
    this.setState({ newValue: newValue });
  }

  





  codeCompileHandler = () => {
    if (this.state.language_id !== "") {
      let CodeForCompile = this.state.newValue;
      let inputData = this.state.inputData;
      let testCaseInput=this.state.Question.testcase_input;
      let sampleInput=this.state.Question.sample_input;
      const encodedString = new Buffer(CodeForCompile).toString("base64");
      // const encodedInput = new Buffer(inputData).toString("base64");
      const encodedTestCaseInput = new Buffer(testCaseInput).toString("base64");
      const encodedSampleInput=new Buffer(sampleInput).toString("base64");
      
      this.setState({ output: "", buttonValue: "Compile and Run" });

      //API call goes here to judge api
      // console.log("std input" + this.state.inputData);

      let codeInputJson = {
        source_code: encodedString,
        language_id: this.state.language_id,
        stdin:encodedSampleInput,
      };

      let TestCasecodeInputJson = {
        source_code: encodedString,
        language_id: this.state.language_id,
        stdin:encodedTestCaseInput,
      };
      
      let sampleOutputString='';
      let testCaseOutputString='';
      let ouputStringStyle = "";

      apiCompile(codeInputJson).then(compiletoken => {
        this.setState({
          buttonenabled: true,
          buttonValue: "Compiling . . .",
          compileRunButton: "compile-run-da"
        });

        setTimeout(() => {
          apiRun(compiletoken.token).then(runData => {
            // console.log("status"+runData.status.id )
            this.setState({
              buttonenabled: false,
              buttonValue: "Compile and Run",
              compileRunButton: "compile-run"
            });

            // console.log(runData);
            // console.log(runData.stdout);
            // let outputString = "";
           
            if (runData.status.id == 11) {
           
              sampleOutputString =
                runData.status.description + "\n\n" + runData.stderr;
              ouputStringStyle = "output-err";
              this.setState({
                buttonenabled: false,
                buttonValue: "Compile and Run",
                compileRunButton: "compile-run",
                output: sampleOutputString,
                outputWindow: ouputStringStyle
              });     
            } else if (runData.status.id == 6) {
              sampleOutputString =
                runData.status.description + "\n\n" + runData.compile_output;
              ouputStringStyle = "output-err";
              this.setState({
                buttonenabled: false,
                buttonValue: "Compile and Run",
                compileRunButton: "compile-run",
                output: sampleOutputString,
                outputWindow: ouputStringStyle
              });     
            } else if (runData.status.id == 1) {
              apiRun(compiletoken.token);
            } else if(runData.status.id==3){
              sampleOutputString = runData.stdout;
              console.log("sample ouput string"+sampleOutputString)

              apiCompile(TestCasecodeInputJson).then(testcasecompiletoken => {
                this.setState({
                  buttonenabled: true,
                  buttonValue: "Compiling . . .",
                  compileRunButton: "compile-run-da"
                });
                setTimeout(() => {
                  apiRun(testcasecompiletoken.token).then(testCaseData => {

                    // let testoutputString = "";
                    // let ouputStringStyle = "";
                    if (testCaseData.status.id == 11) {
                      testCaseOutputString +=
                        testCaseData.status.description + "\n\n" + testCaseData.stderr;
                        ouputStringStyle = "output-err";
                        this.setState({
                          buttonenabled: false,
                          buttonValue: "Compile and Run",
                          compileRunButton: "compile-run",
                          output: testCaseOutputString,
                          outputWindow: ouputStringStyle
                        });     
                    } else if (testCaseData.status.id == 6) {
                      testCaseOutputString +=
                        testCaseData.status.description + "\n\n" + testCaseData.compile_output;
                      ouputStringStyle = "output-err";
                      this.setState({
                        buttonenabled: false,
                        buttonValue: "Compile and Run",
                        compileRunButton: "compile-run",
                        output: testCaseOutputString,
                        outputWindow: ouputStringStyle
                      });     

                    } else if (testCaseData.status.id == 1) {
                      apiRun(testcasecompiletoken.token);

                    } else if(runData.status.id==3){
                                
                        testCaseOutputString=testCaseData.stdout;
                        console.log("testcaseoutput"+testCaseOutputString)
                        this.setState({
                          buttonenabled: false,
                          buttonValue: "Compile and Run",
                          compileRunButton: "compile-run",
                          output: sampleOutputString,
                          testcaseoutput:testCaseOutputString,
                          outputWindow:"output-window"
                        });     

                        this.changeTestCasePassedView();
                    }
                     
                  })
                }, 7000);
                    
              });
            }
       
          });
        }, 7000);
      });

      
    }
    
    
    else {
      alert("Please Select Language Before writing program");
      // this.setState({"newValue":''})
    }
    // console.log(encodedString);
  };



  changeTestCasePassedView=()=>{
    let testcases = [];
    let outputString="";
    let sample_op=this.state.Question;
    outputString=JSON.stringify(this.state.output);
    let soptstr=sample_op.sample_output.split('\n');
    let opString=outputString.split('\n');
  //   console.log(JSON.stringify(outputString))
  //  console.log(sample_op.sample_output);
   if(opString[0]===soptstr[0]){
     alert(soptstr[0])
     this.setState({sampleMark:'✓'});

   }
   else{
    alert("didnotmatch")
    this.setState({sampleMark:'⤫'});
   }

    for (let i = 0; i <this.state.Question.total_test_cases; i++) {
      testcases.push(
        <div>
          <strong>Test Case {i+1}</strong>
          <span className="testPass">&#10003;</span>
          <span className="testFail">&#10539;</span>
        </div>
      );
    }
    return testcases;


  }
  createTestCases = () => {
    let testcases = [];


    for (let i = 1; i <= this.state.Question.total_test_cases; i++) {
      testcases.push(
        <div>
          <strong>Test Case {i}</strong>
          <span className="testPass">&#10003;</span>
          <span className="testFail">&#10539;</span>
        </div>
      );
    }
    return testcases;
  };


  onRequestFullScreen(event) {
    var i = document.getElementById("codeEditor");
    // go full-screen
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
  }

  onLanguageChangeHandler(event) {
    if (event.target.value !== "") {
      let lang_id = event.target.value;
      let lang_name = this.state.lanuages.filter(data => {
        if (data.id == lang_id) return data.name;
      });
      let modeName = lang_name[0].name.split(" ");
      this.setState({
        language_id: lang_id,
        modeValue: modeName[0].toLowerCase()
      });
    } else {
      this.setState({ language_id: "", modeValue: "" });
    }
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  startTimer() {
    var i = document.getElementById("codeEditor");
    // go full-screen
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  // <div className="testCases">{this.createTestCases()}
            
            
  // </div>
  

  render() {
    // console.log(this.state.Question);

    const { inputData } = this.state.inputData;
    return (
      <div id="codeEditor" className="codeEditor">
        {/* HOUR:{this.state.time.h} MINUTES: {this.state.time.m} SECONDS: {this.state.time.s} */}
        <div className="question-header">
          <div className="Heading">
            <strong>{this.state.Question.title}</strong>
          </div>
        </div>
        <div className="displayContent">
          <strong>Question Description</strong>
          <div>
            <p>{this.state.Question.question_description}</p>
          </div>
        </div>
        <div className="displayContent">
          <strong>Input</strong>
          <div>
            <p>{this.state.Question.input_format}</p>
          </div>
        </div>

        <div className="displayContent">
          <strong>Output</strong>
          <div>
            <p>{this.state.Question.output_format} </p>
          </div>
        </div>
        <div className="displayContent">
          <strong>Constraints</strong>
          <textarea
            rows="10"
            className="textareadis"
            value={this.state.Question.constraints}
            readOnly
          />
        </div>

        <div className="SampleFormat">
          <div className="SampleFormatDiv">
            <strong>Sample Input</strong>
            <textarea
              rows="10"
              className="textareadis"
              value={this.state.Question.sample_input}
              readOnly
            />
          </div>

          <div className="SampleFormatDiv">
            <strong>Sample Output</strong>
            <div>
              <textarea
                rows="10"
                className="textareadis"
                value={this.state.Question.sample_output}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="editorDiv">
          <div className="selectLanguage">
            <div>Start Writing Your Code</div>
            <select
              onChange={this.onLanguageChangeHandler.bind(this)}
              value={this.state.lanuages.id}
            >
              <option value="">Select Languages</option>
              {this.state.lanuages.map(language => {
                return (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <AceEditor
              mode={this.state.modeValue}
              theme="twilight"
              name="blah2"
              height="500px"
              width="100%"
              onLoad={this.onLoad}
              onChange={this.onChange}
              fontSize={16}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={false}
              value={this.state.newValue}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                showPrintMargin: false,
                tabSize: 2
              }}
            />
          </div>

          <div>
            <strong>Custom Input</strong>
            <textarea
              rows="5"
              cols="50"
              name="inputData"
              value={inputData}
              className="input-window"
              onChange={this.onInputChanges}
              placeholder="Inputs goes here"
              required
            />
          </div>

          <div>
            <strong>Output</strong>
            <textarea
              className={this.state.outputWindow}
              rows="20"
              cols="100"
              name="input-output"
              placeholder="Outputs Here"
              value={this.state.output}
              readOnly
            />
          </div>
          <div className="allTestCases">
            <strong>Sample Test Case <span className="sampleTestCase">{this.state.sampleMark}</span></strong>

          </div>

          <div className="compile-submit-button">
            <input
              type="button"
              disabled={this.state.buttonenabled}
              className={this.state.compileRunButton}
              onClick={this.codeCompileHandler}
              value={this.state.buttonValue}
            />
            <input type="submit" className="code-commit" value="Submit" />
            {/* <button value="Start Timer" onClick={this.startTimer}/> */}
          </div>
        </div>
      </div>
    );
  }
}
export default CodeCompileAndRunForPractice;
