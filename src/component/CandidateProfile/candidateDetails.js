import React, {Component} from 'react';
import './candidateDetails.css';
import {apiCreateProfile} from '../../codeUnravelApis'


class CandidateDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            candidateObject:{
            name:this.props.user.name,
            email:this.props.user.email,
            alternate_email:'alternate@email.com',
            phone_no:this.props.user.phone_no,
            gender:'',
            qualification:'',
            institute:'',
            passout_year:'',
            highest_percentage:'',
            experience:'',
            current_location:'',
            upload_link:'',
            candidate:''
        },
        userObject:[]
    };
        this.handleSubmit.bind(this);
        this.onChange.bind(this);
    }

    componentDidMount(){
        try{
            if (this.props.user!==undefined ){
                 if(this.props.user.login_token!==undefined || this.props.user.login_token!==""){
                 this.setState({userObject:this.props.user,candidateObject:{candidate:this.props.user.user_id}});
                
                }
                else{
                  this.props.history.push('/');
                }
    
            }else{
                this.props.history.push('/');
            }
       
          }catch(e){
              console.log(e)
            console.log("inside db 5")
            // this.props.history.push("/");
          } 
    } 

    onChange = (e) => {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        let statusCopy = Object.assign({}, this.state);
        statusCopy.candidateObject[inputName] = inputValue;
        this.setState(statusCopy);
        // this.setState({questionObject:{[e.target.name]: e.target.value}});
        // this.setState({ [e.target.name]: e.target.value });
      }

    handleSubmit=(e)=>{
        e.preventDefault();
        const  candidateObj= this.state.candidateObject;
        apiCreateProfile(candidateObj).
        then(data=>{
            this.setState={
                candidateObject:{
                    name:'',
                    email:'',
                    alternate_email:'',
                    phone_no:'',
                    gender:'',
                    qualification:'',
                    institute:'',
                    passout_year:'',
                    highest_percentage:'',
                    experience:'',
                    current_location:'',
                    upload_link:'',
                    candidate:''
                }
            }
            alert("profile created successfully")
        });
        // then((res)=>{
        //    alert("success")
        // })       
    }

    render(){
        const{name,
             email,
            alternate_email,
            phone_no,
            gender,
            qualification,
            institute,
            passout_year,
            highest_percentage,
            experience,
            current_location,
            upload_link}= this.state.candidateObject;
        
        return(
            <div className="create-details">
                <div>              
                <strong>Please Fill in Your Details</strong>
                </div>
                <div><form onSubmit={this.handleSubmit}>
                <div className="details-input">
                <div><strong>Full Name</strong>
                    <input type="text" name="name" value={name} onChange={this.onChange}  placeholder="Full Name" required/></div>
                <div><strong>Email</strong>
                    <input type="email" name="email" value={email} onChange={this.onChange} placeholder="Email" required/></div>
                <div><strong>Alternate Email</strong>
                    <input type="email" name="alternate_email" value={alternate_email} onChange={this.onChange} placeholder="Alternate Email" /></div>
                <div className="first-option">
                    <div><strong>Gender</strong>
                    <select className="option-values"name="gender" value={gender} onChange={this.onChange}>
                        <option value="" selected disabled hidden>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select></div>
                    <div><strong>Qualification</strong>
                    <select className="option-values" name="qualification" value={qualification} onChange={this.onChange}>
                        <option value="" selected disabled hidden>Select</option>
                        <option value="BE">BE</option>
                        <option value="BTech">BTech</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="BSc">BSc</option>
                        <option value="BSc(C.S)">BSc(C.S)</option>
                        <option value="BSc IT">BSc IT</option>
                        <option value="MSc">MSc</option>
                        </select></div></div>
                <div><strong>Institute</strong>
                    <input type="text" name="institute" value={institute} onChange={this.onChange} placeholder="Name of Institution" required/></div>
                <div className="second-option"><div><strong>Year of Passing</strong>
                    <input className="second-option-values" type="number" name="passout_year" min="2008" max="2018"value={passout_year} onChange={this.onChange} placeholder="Year of Passing" required/></div>
                    <div><strong>Percentage(%)</strong>
                    <input className="second-option-values" type="number" name="highest_percentage" value={highest_percentage} onChange={this.onChange} placeholder="Marks" required /></div>                          
                    <div><strong>Experience</strong>
                    <input className="second-option-values" type="number" name="experience" min="0" max="10" value={experience} onChange={this.onChange} required/></div></div>
                <div className="location-contact"><div><strong>Current Location</strong>
                    <input type="text" name="current_location" value={current_location} onChange={this.onChange}placeholder="City" required/></div>
                    <div><strong>Contact Number</strong><input type="tel" name="phone_no" value={phone_no} onChange={this.onChange} placeholder="123-456-7890" required/></div>
                </div>
                
                <div className="upload-option"><div><strong>Upload Photo</strong>
                    <input type="file" name="upload_link" id="photo"value={upload_link} onChange={this.onChange}/></div>
                    <div><strong>Upload CV</strong>
                    <input type="file" name="upload_link" id="resume"value={upload_link} onChange={this.onChange}/></div></div>
                <div><input className="sign-in" type="submit" value="Create Profile" /></div>
                </div>
              </form>
              </div>
              </div>
             
        
        );
    }
    
}

export default CandidateDetails;
