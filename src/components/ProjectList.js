import React, {Component} from 'react';
import {AiFillCloseSquare} from 'react-icons/ai';

//displays a list of projects, including the name of the project, the date it was started and the date it ended
//each row also contains a delete button, which can be used to remove a project from the list
class ProjectList extends Component
{
    constructor(props) {
        super(props);
        this.projectSort = this.projectSort.bind(this);
        this.filter = this.filter.bind(this);
    }

    //returns the HTML reponsible for rendering this class
    render() {
        //define a new variable displayedProjects, and assign to it a list of projects that match the current search, using this.filter()
        let displayedProjects = this.filter();
        //sort the list of projects according to the current sort
        displayedProjects.sort(this.projectSort);
        //return the HTML
        return(
            <div className="ProjectList">
                <div className="projectItem tableHeading">
                    <span className="removeButtonSpan"></span>
                    <span className="projectNameSpan">Project Name</span>
                    <span className="startDateSpan">Start Date</span>
                    <span className="endDateSpan">End Date</span>
                </div>
                {
                    displayedProjects.map(item => (
                        <div className="projectItem" key={item.projectIdentifier}>
                            <span className="removeButtonSpan" id={item.projectIdentifier}><AiFillCloseSquare className="closeIcon" onClick={()=>this.props.deleteFunction(item.projectIdentifier)} /></span>
                            <span className="projectNameSpan">{item.projectName}</span>
                            <span className="startDateSpan">{item.start_date}</span>
                            <span className="endDateSpan">{item.end_date}</span>
                        </div>
                    ))
                }
            </div>
        );
    }

    //filters this.props.projects according to what's in the search bar
    //returns an array of projects
    filter() {
        let searchTerm = this.props.search;
        //if the search is empty, return the full list of projects
        if (searchTerm.localeCompare("") == 0) { 
            return this.props.projects;
        }
        let specifiedProjects = [];
        //replace all backslash (\) characters from the search, as this can cause unwanted errors
        searchTerm = searchTerm.replace(/\\/g, '');
        //split the search term into its individual characters
        let chars = searchTerm.split("");
        let reg_ex_string = "";
        let REG_EX;
        //define the string for the regular expression by iterating through the array of search characters
        for (let i = 0; i < chars.length; i++) {
            reg_ex_string = reg_ex_string + `[${chars[i]}]`;
        }
        //create new regular expression object
        REG_EX = new RegExp(reg_ex_string, "gi");
        //iterate through each project from props, adding each one which matches the search to the local variable specifiedProjects
        for (let i = 0; i < this.props.projects.length; i++) {
            if (REG_EX.test(this.props.projects[i].projectName) == true) {
                specifiedProjects.push(this.props.projects[i]);
            }
        }
        //return the array of projects which match the search
        return specifiedProjects;
    }

    //sorting algorithm for the projects
    //contains four possible sorts
    projectSort(a, b) {
        //if the sort type is by name, use localeCompare() to determine which name comes first alphabetically
        if (this.props.sortBy == "name") {
            if (this.props.sortDirection == "descending") {
                if (a.projectName.localeCompare(b.projectName) > 0) return 1;
                if (a.projectName.localeCompare(b.projectName) < 0) return -1;
                return 0;
            }
            else if (this.props.sortDirection == "ascending") {
                if (a.projectName.localeCompare(b.projectName) < 0) return 1;
                if (a.projectName.localeCompare(b.projectName) > 0) return -1;
                return 0;
            }
        }
        //if the sort type is by date, create date objects from the parameters and do a direct comparison
        else if (this.props.sortBy == "date") {
            let date_a = new Date(a.start_date);
            let date_b = new Date(b.start_date);

            if (this.props.sortDirection == "descending") {
                if (date_a < date_b) return 1;
                if (date_a > date_b) return -1;
                return 0; 
            }
            else if (this.props.sortDirection == "ascending") {
                if (date_a > date_b) return 1;
                if (date_a < date_b) return -1;
                return 0; 
            }
        }
    }
}
export default ProjectList;