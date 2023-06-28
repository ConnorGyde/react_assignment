import React, {Component} from 'react';

//form which is used to create a new project object, and add it to the list displayed
class CreateProjectForm extends Component
{
    constructor(props) {
        super(props);
        this.state = {       
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date: "",
            end_date: "",
            displayErrors: false,
            errorMessages: null
        }
        this.formChanged = this.formChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        //define an array of empty strings which are placeholders for error messages
        let errors = ["", "", "", "", ""];
        //if this.state.displayErrors is true, get the error messages from the state
        if (this.state.displayErrors) {
            errors = this.state.errorMessages;
        }
        return(
            <form onSubmit={this.handleSubmit} className="CreateProjectForm">
                <div className="formRow">
                    <h2>Create Project</h2>
                </div>
                <div className="formRow">
                    <label htmlFor="projectName" className="formLabel">Project Name: </label>
                    <input name="projectName" onChange={this.formChanged} className="formObject textbox" type="text" placeholder="Project Name"></input>
                    <p className="errorAlert">{errors[0]}</p>
                </div>
                <div className="formRow">
                    <label htmlFor="projectIdentifier" className="formLabel">Project ID: </label>
                    <input name="projectIdentifier" onChange={this.formChanged} className="formObject textbox" type="text" placeholder="Project ID (must be unique)"></input>
                    <p className="errorAlert">{errors[1]}</p>
                </div>
                <div className="formRow">
                    <label htmlFor="description" className="formLabel">Project Description: </label>
                    <textarea name="description" onChange={this.formChanged} className="formObject textbox" type="text" placeholder="Project Description"></textarea>
                </div>
                <div className="formRow">
                    <label className="formLabel" htmlFor="start_datePicker">Start Date: </label>
                    <input name="start_date" onChange={this.formChanged} className="datePicker" type="date"></input>
                    <p className="errorAlert">{errors[3]}</p>
                </div>
                <div className="formRow">
                    <label className="formLabel" htmlFor="end_datePicker">End Date: </label>
                    <input name="end_date" onChange={this.formChanged} className="datePicker" type="date"></input>
                    <p className="errorAlert">{errors[4]}</p>
                </div>
                <button type="submit" className="submitButton">Submit</button>
                <button type="button" onClick={this.props.hideSelf}>Cancel</button>
            </form>
        );
    }

    //when the form is changed in any way, update the state variables to match what the user has entered
    //in retrospect, this could have been done when the user pressed 'Submit' instead of when anything changed
    formChanged(event) {
        let element = event.target;
        let name = element.name;
        let value = element.value;
        this.setState({[name]: value})
    }

    //when the user clicks 'Submit', check the data
    //if the data is valid, create a new project object in the parent class
    //if the data is invalid, show relevant error messages to the user
    handleSubmit(event) {
        event.preventDefault(); 
        let foundErrors = false;
        let validID;
        let errors = new Array(5);
        //first, check if any of the required fields are empty
        if (this.state.projectName.localeCompare("") == 0) {
            foundErrors = true;
            errors[0] = "Project name cannot be blank.";
        }
        if (this.state.projectIdentifier.localeCompare("") == 0) {
            foundErrors = true;
            errors[1] = "Project ID cannot be blank.";
        }
        if (!this.state.start_date) {
            foundErrors = true;
            errors[3] = "Start date must be entered.";
        }
        if (!this.state.end_date) {
            foundErrors = true;
            errors[4] = "End date must be entered.";
        }
        //call the parent class' checkIdFunction to ensure the ID entered is not already in use
        validID = this.props.checkIdFunction(this.state.projectIdentifier);
        //if the ID is invalid, show an error message to the user
        if (!validID) {
            foundErrors = true;
            errors[1] = "This ID is already taken. Please choose another one.";
        }
        //if the start date is after the end date, show an error
        if ((this.state.end_date) && (this.state.start_date)) {
            if (this.state.start_date > this.state.end_date) {
                foundErrors = true;
                errors[3] = "Start date must be before end date.";
            }
        } //if this method found any errors, set the displayErrors flag to true and update errorMessages with the errors last found
        if (foundErrors) {
            this.setState({displayErrors: true, errorMessages: errors})
        }
        else { //else if all the data is valid, create a new project object and pass it to the parent class so it can be added to the list
            let project = {
                projectName: "",
                projectIdentifier: "",
                description: "",
                start_date: "",
                end_date: ""
            }
            project.projectName = this.state.projectName;
            project.projectIdentifier = this.state.projectIdentifier;
            project.description = this.state.description;
            project.start_date = this.state.start_date;
            project.end_date = this.state.end_date;
            this.props.add(project);
        }
    }

}
export default CreateProjectForm;