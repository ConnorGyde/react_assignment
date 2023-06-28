//https://reactjs.org/docs/forms.html
//used info from this URL for help with the 'create project' form

import React, {Component} from 'react';
import '../css/App.css';
import CreateProjectForm from './CreateProjectForm';
import SortBy from './SortBy';
import ProjectList from './ProjectList';

//'App' class is the base class of this application, and controls all its child components through state and props, including:
//  - the 'Create New Project' form
//  - the 'Sort By' control
//  - the list of projects
class App extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sortBy: "name",
      sortDirection: "descending",
      search: "",
      showForm: false,
      showCreateFormButton: true
    }
    //binding 'this' to class' methods
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sortChanged = this.sortChanged.bind(this);
    this.textChanged = this.textChanged.bind(this);
    this.delete = this.delete.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.checkID = this.checkID.bind(this);
    this.addProject = this.addProject.bind(this);
  }

  //renders a heading, 'create project' form, a 'sort' header, and a list of projects
  render() {
    let projectList, createProjectForm, createFormButton;
    //if our data length is zero, make the project list null as we don't have to display anything
    if (this.state.data.length == 0) {
      projectList = null;
    } //else define projectList with various props
    else projectList = <ProjectList projects={this.state.data} sortBy={this.state.sortBy} sortDirection={this.state.sortDirection} search={this.state.search} deleteFunction={this.delete}/>
    //if showForm is false, the 'create project form' will be null and won't display: else, define the CreateProjectForm with appropriate props
    if (this.state.showForm == false)
      createProjectForm = null;
    else createProjectForm = <CreateProjectForm hideSelf={this.hideForm} checkIdFunction={this.checkID} add={this.addProject}/>
    //assign value to createFormButton according to whether the button should be displayed or not
    if (this.state.showCreateFormButton == false) {
      createFormButton = null;
    }
    else createFormButton = <button className="createFormButton" onClick={this.showForm}>Create a New Project</button>
    //html we want to render
    return(
      <div className="App">
        <div className="header">
          <h1 className="mainHeading">Projects</h1>
          {createFormButton}
        </div>
        {createProjectForm}
        <SortBy onSortChange={this.sortChanged} onTextChange={this.textChanged}/>
        {projectList}
      </div>
    );
  }

  //method called from within <CreateProjectForm>, which adds a new project into this.state.data upon successful submission of data
  addProject(projectInfo) {
    let newLength = this.state.data.length + 1;
    let newData = new Array(newLength);
    for (let i = 0; i < this.state.data.length; i++) {
      newData[i] = this.state.data[i];
    }
    newData[newLength - 1] = projectInfo;
    this.setState({data: newData});
    this.hideForm();
  }

  //method called from within <CreateProjectForm>, which checks if an ID entered into the form already exists in this.state.data
  checkID(id) {
    let found = false;
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].projectIdentifier == id) {
        found = true;
      }
    }
    return !found;
  }

  //simple toggle method which shows the <CreateProjectForm>, and hides the 'create form' button
  showForm() {
    this.setState({showForm: true, showCreateFormButton: false});
  }

  //simple toggle method which hides, the <CreateProjectForm>, and shows the 'create form' button
  hideForm() {
    this.setState({showForm: false, showCreateFormButton: true});
  }

  //when the component mounts, fetch the JSON data and update this.state
  componentDidMount() {
    fetch('./data.json')
    .then(response => response.json())
    .then(response => {
      this.setState({data: response})
    });
  }

  //method called from within <SortBy>, which indicates the sort has changed and updates this component's state accordingly
  sortChanged(sort) {
    if ((sort == "name") || (sort == "date")) {
      this.setState({sortBy: sort});
    }
    else this.setState({sortDirection: sort});
  }

  //method called from <SortBy>, which indicates that the user has searched something in the search bar -- update state accordingly
  textChanged(text) {
    this.setState({search: text});
  }

  //method called from <ProjectList>, which passes an ID so that <App> can delete the project from the list
  delete(id) {
    let newData = this.state.data;
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].projectIdentifier == id) {
        newData.splice(i, 1);
      }
    }
    this.setState({data: newData});
  }
}
export default App;