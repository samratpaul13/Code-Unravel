import React, { Component } from 'react';
// import HomeHeader from '../HomeHeader/homeheader';
// import HomeBody from './homeBody';
// import Footer from '../Footer/footer.js';
import PageHeader from '../PageHeader/pageHeader'
import "./QuestionDetails.css"

export default class QuestionDetails extends Component {
    constructor() {
        super();
        this.state={
          questionObject:{
          question_description:'',
          input_format:'',
          output_format:'',
          constraints:'',
          sample_input:'',
          sample_output:'',
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
}
    componentDidMount(){
      if(this.props.question!==undefined){
        console.log(this.props.status);
          this.setState({questionObject:this.props.question});
          }
    }
  render() {
    let {
      question_description,
      input_format,
      output_format,
      constraints,
      sample_input,
      sample_output,
      title,
      max_Score,
      pass_score,
      complexity_level,
      time_limit,
      allow_languages} = this.state.questionObject;
    return (
        <div>
        {/* <PageHeader/> */}
    <div className="question-details-background">
    <div className="question-details-container">
        
        <div className="question-details-body">
            <div class="Heading"><div><strong>{title}</strong></div></div>
                    
                <div className="displayContent">
                    <strong>Question Description</strong>
                    <div>
                    <p>{question_description}</p>
                    </div>
                </div>
                <div className="displayContent">
                <strong>Input</strong>
                    <div>
                    <p>{input_format}</p>
                    </div>
                </div>
                <div className="displayContent">
                    <strong>Output</strong>
                    <div>
                    <p>{output_format} </p>
                    </div>
                </div>
                <div className="displayContent">
                    <strong>Constraints</strong>
                    <div>
                    <p>{constraints} </p>
                    </div>
                </div>
                <div className="SampleFormat">
                    <div className="SampleFormatDiv">
                        <strong>Sample Input</strong>
                        <div>
                        <p>{sample_input}</p>
                        </div>
                    </div>
                    <div className="SampleFormatDiv">
                        <strong>Sample Output</strong>
                        <p className="textSample">
                        {sample_output}
                        </p>
                    </div>
                </div>
        </div>
    </div>
    </div>
</div>  
    );
  }
}






