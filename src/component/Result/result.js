import React, { Component } from 'react';
import './result.css';
import {apiGetQuestion, apiGetTask} from './../../codeUnravelApis.js';


class Result extends Component
{
    constructor(){
        super();
        this.state={
            results:[],
            tasks:[],
            date:''
        }
    }

    getResult=(date)=>{
        var body_data={
            recruiter:1,
            start_date:date
        }
        

        fetch('http://127.0.0.1:8000/codeunravel/user_ids/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body_data)
      }).then(res => res.json())
      .then(data => data)
      .then(data=>{this.setState({results:data})})

    }
    componentWillMount()
    {
       
        
      apiGetTask()
      .then(data=> {
        this.setState({tasks:data})
       })
      .catch(() => {
          alert("get question fail")
      });
    
    

  
    }

    HandleOnChange=(e)=>{
        console.log(e.target.value)
        this.setState({date:e.target.value})
        this.getResult(e.target.value)
    }

    render(){
        console.log(this.state.tasks)
        
       
        return(
            <div className="result-container">
            <div className="select-test-date">
                <div className="select-tag">
                    <select onChange={this.HandleOnChange} className="select-css">
                    <option>Select Date</option>
                        {
                            this.state.tasks.map((task)=>{
                                return(
                                <option value={task['start_date']} name="date">{task['start_date']}</option>
                                ) })
                        }
                        
                    </select>
                </div>
            </div>
            
            {this.state.results.map((result)=>{
                      
                      return(
                          <div>
                       
                        <div className="result-candidate-details">
                            
                            <div>
                            <strong>Name:-</strong>{result['name']}
                            </div>
                            <div>
                            <strong>Email:-</strong>{result['email']}
                            </div>
                
                        </div>
                        <div className="result-data">
            
                            <div className="source-code-container">
                                <div><strong>
                                Source Code</strong>
                                </div>
                                <div className="source-code">
                                {/* <div className="margin"> */}
                                <textarea  className="margin" value= {result['source_code']}>

                                </textarea>
                               
                                {/* </div> */}
                                </div>
                            </div>    
                            <div className="real-content">
            
                            <div>
                                <strong>score earned</strong>
                            </div>
                            <div>
                                {result['score']}
                            </div>
            
                            <div>
                                <strong>Total test cases</strong>
                            </div>
                            <div>
                                {result['total_test_cases']}
                            </div>
            
                            <div>
                                <strong>Test case cleared</strong>
                            </div>
                            <div>
                                {result['total_test_case_passed']}
                            </div>
            
                            <div>
                                <strong>Language</strong>
                            </div>
                            <div>
                                {result['language']}
                            </div>
            
                            <div>
                                <strong>Attempted date</strong>
                            </div>
                            <div>
                                {result['attempted_on']}
                            </div>
                            <div>
                                <strong>Attempted time</strong>
                            </div>
                            <div>
                                {result['time']}
                            </div>
                            <div>
                            </div>
                            </div>
                           
                        </div>
                        </div>
                        
                      )})}
            
            </div>
        );
    }


}
export default Result