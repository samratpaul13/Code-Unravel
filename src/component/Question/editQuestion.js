import React, { Component } from 'react';
import './CreateQuestion.css';
import {apiEditQuestion} from '../../codeUnravelApis'
export default class EditQuestion extends Component
{
    constructor(props){
        super(props);
        this.state={
            questionObject:{
            question_description:'',
            input_format:'',
            output_format:'',
            constraints:'',
            sample_input:'',
            sample_output:'',
            testcase_input:'',
            testcase_output:'',
            total_test_cases:'',
            test_case_output_block_size:0,
            title:'',
            max_Score:'',
            pass_score:'',
            complexity_level:'',
            time_limit:'',
            allow_languages:'',
            recruiter:'',
        },

        userObject:[],
        status:'',

        };
        this.handleSubmit.bind(this);
        this.onChange.bind(this);
    }


componentDidMount(){

    if(this.props.question!==undefined){
       
     this.setState({questionObject:this.props.question,
    status:this.props.status});
    }
   
}

componentWillMount(){
}

   
    onChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.questionObject[inputName] = inputValue;
        this.setState(statusCopy);
      }



    handleSubmit=(e)=>{
        e.preventDefault();
        const  questionObj= this.state.questionObject;
        if(questionObj.complexity_level==="")
         {
             alert("Please select Complexity level");
         }
        else if(questionObj.time_limit===""){
            alert("please select time limit")
        }else{
           
          
        if(this.props.status===true)
        { 
        apiEditQuestion(questionObj).
        then(data=>{
            this.Setstate={
                questionObject:{
                question_description:'',
                input_format:'',
                output_format:'',
                constraints:'',
                sample_input:'',
                sample_output:'',
                testcase_input:'',
                testcase_output:'',
                total_test_cases:'',
                test_case_output_block_size:0,
                title:'',
                max_Score:'',
                pass_score:'',
                complexity_level:'',
                time_limit:'',
                allow_languages:'',
                recruiter:'',
            }
        }
           alert("Question Edited Successfully")
        })  
    } 
       
    }

    }
   

    render(){
        let {question_description,
        input_format,
        output_format,
        constraints,
        sample_input,
        sample_output,
        testcase_input,
        testcase_output,
        total_test_cases,
        title,
        max_Score,
        pass_score,
        complexity_level,
        time_limit,
        allow_languages} = this.state.questionObject;
        return(
            <div className="create">
                <div className="form-data">
                    <div>
                    <form onSubmit={this.handleSubmit}>
                    <strong>Title</strong>
                        <input type="text" id="title" name="title" value={title} placeholder="Enter title here" onChange={this.onChange} required/>
                        <strong>Question Description</strong>
                        <textarea rows="4" cols="50" name="question_description" value={question_description} id="description" onChange={this.onChange} placeholder="Enter question description here" required/>
                        <strong>Input Format</strong>
                        <textarea rows="2" cols="50" name="input_format"  value={input_format} id="inputFormat" onChange={this.onChange} placeholder="Enter input format here" required/>
                        <strong>Output Format</strong>
                        <textarea rows="2" cols="50" name="output_format" value={output_format} id="outputFormat" onChange={this.onChange} placeholder="Enter output format here" required/>
                        <strong>Constraints</strong>
                        <textarea rows="2" cols="50" name="constraints" value={constraints} id="constraints" onChange={this.onChange} placeholder="Enter constraints here" required/>
                        <strong>Sample Input</strong>
                        <textarea rows="2" cols="50" name="sample_input" value={sample_input} id="sampleInput" onChange={this.onChange} placeholder="Enter sample input here" required/>
                        <strong>Sample Output</strong>
                        <textarea rows="2" cols="50" name="sample_output" value={sample_output} id="sampleOutput" onChange={this.onChange}  placeholder="Enter sample output here" required/>
                        <strong>Total Test Cases</strong>
                        <input type="number" id="no_of_testcases" name="total_test_cases" value={total_test_cases} placeholder="Enter Total Test Cases here" onChange={this.onChange} required/>
                        {/* <strong>Test Case Output Block Size</strong>
                        <input type="number" id="test_case_output_block_size" name="test_case_output_block_size" value={test_case_output_block_size} placeholder="Enter Total Test Cases Output Block Size" onChange={this.onChange} required/> */}
                        <strong>Test Case Input</strong>
                        <textarea rows="5" cols="50" name="testcase_input" value={testcase_input} id="testcase_input" onChange={this.onChange}  placeholder="Enter Test Case Input here" required/>
                        <strong>Test Case Output</strong>
                        <textarea rows="5" cols="50" name="testcase_output" value={testcase_output} id="testcase_output" onChange={this.onChange}  placeholder="Enter Test Case output here" required/>

                            <div className="oprions-grid">
                            <div>
                                <strong>Complexity Level</strong>
                                    <select name="complexity_level" value={complexity_level} onChange={this.onChange} id="level">
                                    <option selected="selected" value="">Select Complexity</option>
                                    <option value="1">Easy</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Hard</option>
                                    </select>
                            </div>
                            <div>
                                <strong>Allowed Languages</strong>
                                    <select name="allow_languages"  value={allow_languages} onChange={this.onChange}  id="language">
                                    <option selected="selected" value="">Select Language</option>
                                    <option value="1">C</option>
                                    <option value="2">C++</option>
                                    <option value="3">java</option>
                                    </select>
                            </div>
                            <div>
                            <strong>Full Score  </strong>
                                     <input type="number" name="max_Score" value={max_Score} onBlur={this.onChange} id="maxScore" required/>
                            </div>

                            <div>
                            <strong>Pass Score</strong>
                                     <input type="number" name="pass_score" value={pass_score} onBlur={this.onChange} id="passScore" required/>
                            </div>

                        </div>
                        <div>
                        <strong>Time Limit</strong>
                        <select name="time_limit" value={time_limit} onChange={this.onChange} id="time" >
                            
                            <option selected="selected" value="">Select Time Limit</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hour</option>
                            <option value="120">2 hour</option>
                            </select>
                        </div>
                        <input className="create-question-bu" type="submit" value="Update Question"/>
                    </form>
                    </div>
            
          
                </div>
            </div>
        );
    }
}
