import React, { Component } from "react";
import "./candidate.css";
import {apiSubmitTestResult } from "../../codeUnravelApis";
import  {getAllSources} from './SourceCodeTemplate'
// import brace from 'brace';
import AceEditor from "react-ace";
import "brace/mode/jsx";
import { apiCompile, apiRun, getLanguages,apiCreateTestResut } from "../../codeUnravelApis";
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

class CodeCompileAndRun extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      SourceCodeFromEditor: "",
      lanuages: [],
      modeValue: "python",
      language_id: "",
      output: "",
      testcaseoutput: "",
      sampleMark: "",
      inputData: "",
      outputWindow: "output-window",
      buttonenabled: false,
      buttonValue: "Compile and Run",
      compileRunButton: "compile-run",
      time: {},
      seconds:0,
      Question: {
        title: "",
        question_id:'',
        question_description:
          "",
        input_format:
          "",
        output_format:
          '',
        constraints: "",
        sample_input: "",
        sample_ouptut: "",
        testcase_input: "",
        testcase_output: "",
        total_test_cases: 0,
        test_case_output_block_size: "",
        time_limit:'',
        Practice: ""
      },
      testCasesView:[],
      testCasesStyleView:[],
      testCasePassed:0,
      encodSourceCode:'',
      sources:{},

    };

    this.codeCompileHandler.bind(this);
    this.onLanguageChangeHandler.bind(this);
    this.onInputChanges.bind(this);
    this.onRequestFullScreen.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.timer = 0;
    this.changeTestCasePassedView.bind(this);
    this.codeSubmit.bind(this);
    this.testCaseOutputList=[];
    this.onTestCaseExecuteHandler.bind(this);
  }

  componentWillMount() {
    this.setState({ Question: this.props.question[0] ,sources:getAllSources()});

    console.log("sdf"+getAllSources())
  }
  componentDidMount() {
    getLanguages().then(data => {
      this.setState({ lanuages: data,seconds:this.state.Question.time_limit*60, time: timeLeftVar });
      this.startTimer();
    });
    let timeLeftVar = this.secondsToTime(this.state.seconds);
  }

  onInputChanges = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange(SourceCodeFromEditor) {
    this.setState({ SourceCodeFromEditor: SourceCodeFromEditor });
  }

onTestCaseExecuteHandler(testCaseInputs){
  if(testCaseInputs.length > 0){
  let CodeForCompile = this.state.SourceCodeFromEditor;
  const encodedString = new Buffer(CodeForCompile).toString("base64");
    let TestCasecodeInputJson = {
       source_code: encodedString,
       language_id: this.state.language_id,
       stdin: testCaseInputs[0],
     };
let testCaseOutputString="";
let ouputStringStyle="";
     setTimeout(() => {
       apiCompile(TestCasecodeInputJson).then(testcasecompileData => {

         if (testcasecompileData.status.id === 11) {
           testCaseOutputString +=
           testcasecompileData.status.description +
             "\n\n" +
             testcasecompileData.stderr;
           ouputStringStyle = "output-err";
           this.setState({
             buttonenabled: false,
             buttonValue: "Compile and Run",
             compileRunButton: "compile-run",
             output: testCaseOutputString,
             outputWindow: ouputStringStyle
           });
         } else if (testcasecompileData.status.id === 6) {
           testCaseOutputString +=
           testcasecompileData.status.description +
             "\n\n" +
             testcasecompileData.compile_output;
           ouputStringStyle = "output-err";
           this.setState({
             buttonenabled: false,
             buttonValue: "Compile and Run",
             compileRunButton: "compile-run",
             output: testCaseOutputString,
             outputWindow: ouputStringStyle
           });
         } else if (testcasecompileData.status.id <= 2) {
            apiRun(testcasecompileData.token);

         } else if (testcasecompileData.status.id === 3) {
          let testCaseoutput=new Buffer(testcasecompileData.stdout, 'base64').toString('ascii');
        
          this.testCaseOutputList.push(testCaseoutput);
          this.onTestCaseExecuteHandler(testCaseInputs.slice(1));

         }
       });

       },100);

      }else{
        this.setState({testCasesView:this.testCaseOutputList})
           console.log("sample test output list"+this.state.output)
           console.log("output list"+this.testCaseOutputList)
           this.changeTestCasePassedView();

      }
   }

  codeCompileHandler = () => {
    this.setState({ sampleMark: "",testCaseViewList:[],testCasesView:[] });
    this.testCaseOutputList=[];
    if (this.state.language_id !== "") {
      if (this.state.Question.Practice === 0) {
        let CodeForCompile = this.state.SourceCodeFromEditor;
        let testCaseInput = this.state.Question.testcase_input.trim();
        let sampleInput = this.state.Question.sample_input.trim();
        const encodedString = new Buffer(CodeForCompile).toString("base64");
        this.setState({encodSourceCode:encodedString});
        const encodedSampleInput = new Buffer(sampleInput).toString("base64");
        this.setState({ output: "", buttonValue: "Compile and Run" });  
        let testCaseOutputString = "";
        let ouputStringStyle = "";
        let startFrom=0;
        let no_of_testcases=this.state.Question.total_test_cases;
        const endTo = (sampleInput.match(/\r?\n/g) || '').length + 1;
        let arrayOfLines = testCaseInput.split("\n");
        let encodedArrayOfTestCases=[];
        for(let i=0;i<no_of_testcases;i++){
                      let testIpString='';
                    for(let j=startFrom;j<(startFrom+endTo) ;j++){
                      testIpString+=arrayOfLines[j]+"\n";
                    }
                  startFrom+=endTo;
                  let encodedTestCaseInput = new Buffer(testIpString.trim()).toString(
                    "base64"
                  );
                  encodedArrayOfTestCases.push(encodedTestCaseInput);

                }

              let  sampleTestCasecodeInputJson = {
                    source_code: encodedString,
                    language_id: this.state.language_id,
                    stdin: encodedSampleInput
                  };

                  setTimeout(() => {
                    apiCompile(sampleTestCasecodeInputJson).then(testcasecompileData => {
                      if (testcasecompileData.status.id === 11) {
                        let error1=new Buffer(testcasecompileData.message, 'base64').toString('ascii');
                      //  let error2=new Buffer(testcasecompileData.stdout, 'base64').toString('ascii');
                        testCaseOutputString +=
                        testcasecompileData.status.description +
                          "\n\n" +
                          error1;
                        ouputStringStyle = "output-err";
                        this.setState({
                          buttonenabled: false,
                          buttonValue: "Compile and Run",
                          compileRunButton: "compile-run",
                          output: testCaseOutputString,
                          outputWindow: ouputStringStyle
                        });
                      } else if (testcasecompileData.status.id === 6) {
                        let error=new Buffer(testcasecompileData.compile_output, 'base64').toString('ascii');
            
                        testCaseOutputString +=
                        testcasecompileData.status.description +
                          "\n\n" +
                          error;
                        ouputStringStyle = "output-err";
                        this.setState({
                          buttonenabled: false,
                          buttonValue: "Compile and Run",
                          compileRunButton: "compile-run",
                          output: testCaseOutputString,
                          outputWindow: ouputStringStyle
                        });
                      } else if (testcasecompileData.status.id <= 2) {
                         apiRun(testcasecompileData.token);
    
                      } else if (testcasecompileData.status.id === 3) {
                        let sampleoutput=new Buffer(testcasecompileData.stdout, 'base64').toString('ascii');
                          this.setState({
                            buttonenabled: false,
                            buttonValue: "Compile and Run",
                            compileRunButton: "compile-run",
                            output: sampleoutput,
                            outputWindow: "output-window",
                          });
                          this.changeTestCasePassedView();
          
                         this.onTestCaseExecuteHandler(encodedArrayOfTestCases);
                      }
                    });
                    },10);

      } else {
        let CodeForCompile = this.state.SourceCodeFromEditor;
        let inputData = this.state.inputData;
        const encodedString = new Buffer(CodeForCompile).toString("base64");
        const encodedInput = new Buffer(inputData).toString("base64");
        this.setState({ output: "", buttonValue: "Compile and Run" });
        let codeInputJson = {
          source_code: encodedString,
          language_id: this.state.language_id,
          stdin: encodedInput
        };
        let sampleOutputString = "";
        let ouputStringStyle = "";
        apiCompile(codeInputJson).then(compiletoken => {
          this.setState({
            buttonenabled: true,
            buttonValue: "Compiling . . .",
            compileRunButton: "compile-run-da"
          });

          setTimeout(() => {
            apiRun(compiletoken.token).then(runData => {
              this.setState({
                buttonenabled: false,
                buttonValue: "Compile and Run",
                compileRunButton: "compile-run"
              });
              if (runData.status.id === 11) {
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
              } else if (runData.status.id === 6) {
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
              } else if (runData.status.id === 1) {
                apiRun(compiletoken.token);
              } else if (runData.status.id === 3) {
                sampleOutputString = runData.stdout;
                this.setState({
                  buttonenabled: false,
                  buttonValue: "Compile and Run",
                  compileRunButton: "compile-run",
                  output: sampleOutputString,
                  outputWindow: "output-window"
                });
              }
            });
          }, 7000);
        });
      }
    } else {
      alert("Please Select Language Before writing program");
    }
  };

  changeTestCasePassedView = () => {
    let testCasePassedCount=0;
    let outputString= this.state.output;
    let soptstr = this.state.Question.sample_output;
    let opString = outputString.trim();
    let replacedString = soptstr.replace(/\n/g,'');
    let replaceOptString=opString.replace(/\n/g,'');
    if (replacedString===replaceOptString) {
      this.setState({ sampleMark: "1" });
    } else {
      this.setState({ sampleMark: "0" });
    }
    let testCaseViewList=[];
    let testCaseList=this.state.testCasesView;
    let responseOutputLength=this.state.testCasesView.length;
    let sampleOutputLength = (soptstr.match(/\r?\n/g) || '').length + 1;
    let testCaseOutput=this.state.Question.testcase_output.trim();
    let arrayOfLines = testCaseOutput.split("\n");
    let startFrom=0;
    console.log(testCaseOutput+"   "+testCaseList)
   for(let i=0;i<responseOutputLength;i++){
     let sample_temp='';
     for(let j=startFrom;j<(startFrom+sampleOutputLength);j++){

      sample_temp+=arrayOfLines[j]+"\n";
      }
      startFrom+=sampleOutputLength;
      replacedString=JSON.stringify(testCaseList[i].trim()).replace(/\n/g,'');
      replaceOptString=JSON.stringify(sample_temp.trim()).replace(/\n/g,'');
     if(replacedString===replaceOptString){
     testCasePassedCount+=1;
      testCaseViewList.push(<div key={"tc"+i}><strong>Test Case {i+1}</strong>
        <span className="testPass">&#10003;</span></div>)
     }else{
      testCaseViewList.push(<div key={"tc"+i}><strong>Test Case {i+1}</strong>
        <span className="testFail">&#10539;</span></div>)
     }

   }
this.setState({testCasesStyleView:testCaseViewList,testCasePassed:testCasePassedCount});
  };


  onRequestFullScreen() {
    var i = document.getElementById("codeEditor");
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
      console.log("jdgsgfjsdfjfhds"+this.state.sources[lang_id]);
      this.setState({
        language_id: lang_id,
        modeValue: modeName[0].toLowerCase(),
        SourceCodeFromEditor:this.state.sources[lang_id],
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
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  codeSubmit=()=>{

//   let testResultObject={
//     "score": 0,
//     "total_test_cases": 0,
//     "status": 1,
//     "total_test_case_passed": 0,
//     "time": '',
//     "memory": '',
//     "language":'',
//     "is_practice": 0,
//     "is_challenge": 0,
//     "source_code": '',
//     "encoded_source_code":'',
//     "is_qualified": 0,
//     "attempted_on": '',
//     "attempt_time": '',
//     "finished_time": '',
//     "output": '',
//     "candidate": 0,
//     "question": 0,
//     "challenge_id": 1
// }
let scoreSecured=0;
let is_qualified=0;
let no_of_testcases=this.state.Question.total_test_cases;
if(no_of_testcases!=0){
  scoreSecured=(this.state.testCasePassed/no_of_testcases)*100;
console.log("score secured"+scoreSecured);
if(scoreSecured>60){
  is_qualified=1;
}

scoreSecured=Math.ceil( scoreSecured ); 
}

let testResultObject={
  "score": scoreSecured,
  "total_test_cases": no_of_testcases,
  "status": 1,
  "total_test_case_passed": this.state.testCasePassed,
  "time": "04:26:31",
  "memory": "124kb",
  "language": this.state.modeValue,
  "is_practice": this.state.Question.is_practice,
  "is_challenge": this.state.Question.is_challenge,
  "source_code": this.state.SourceCodeFromEditor,
  "encoded_source_code": this.state.encodSourceCode,
  "is_qualified": is_qualified,
  "attempted_on": new Date(),
  "attempt_time": "12:12",
  "finished_time": "23:23",
  "output": "ouput",
  "candidate": 2,
  "question": this.state.Question.question_id,
  "challenge_id": 1
}
  apiCreateTestResut(testResultObject).then(()=>{

  alert("Question Submitted Successfully");



  });







}





  render() {
    const { inputData } = this.state.inputData;
    return (
      <div id="codeEditor" className="codeEditor">
        HOUR:{this.state.time.h} MINUTES: {this.state.time.m} SECONDS: {this.state.time.s}
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
              value={this.state.SourceCodeFromEditor}
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

          <div className="customInputOutput">
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

          <div className="customInputOutput">
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
          {(() => {
                switch(this.state.sampleMark) {
                    case '':
                        return (<div><strong>
                          Sample Test Case
                           <span className="sampleTestCase"></span>
                          </strong></div>);
                    case '1':
                         return (<div><strong>Sample Test Case<span className="testPass">&#10003;</span>
                           </strong></div>);
                    case '0':
                        return (<div><strong>
                        Sample Test Case
                        <span className="testFail">&#10539;</span>
                        </strong></div>);
                    default:
                        return null;
                }
            })()}
            {
            (this.state.testCasesStyleView!==undefined)?(
              this.state.testCasesStyleView.map((item)=>{
                return item;
              })

            ):(<div></div>)
            }
          </div>

          <div className="compile-submit-button">
            <input
              type="button"
              disabled={this.state.buttonenabled}
              className={this.state.compileRunButton}
              onClick={this.codeCompileHandler}
              value={this.state.buttonValue}
            />
            <input type="submit" onClick={this.codeSubmit.bind(this)} className="code-commit" value="Submit" />
          </div>
        </div>
      </div>
    );
  }
}
export default CodeCompileAndRun;