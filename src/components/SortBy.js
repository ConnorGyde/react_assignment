import React, {Component} from 'react';

//'Sort By' consists of a search bar, and two methods of sorting the list of projects
// all data is passed back to the parent <App> class for processing
class SortBy extends Component
{
    constructor(props) {
        super(props);
        this.sortChanged = this.sortChanged.bind(this);
        this.textChanged = this.textChanged.bind(this);
    }

    //returns the HTML required to render this class
    render() {
        return(
            <div className="SortBy">
                <input type="text" className="searchBox" onChange={this.textChanged} placeholder="Search for a project here..."></input>
                <label htmlFor="sortBySelect">Sort By: </label>
                <select className="sortBySelect">
                    <option id="name" onClick={this.sortChanged}>Name</option>
                    <option id="date" onClick={this.sortChanged}>Date Started</option>
                </select>
                <select className="sortDirectionSelect">
                    <option id="descending" onClick={this.sortChanged}>Descending</option>
                    <option id="ascending" onClick={this.sortChanged}>Ascending</option>
                </select>
            </div>
        );
    }

    //when one of the sort controls is changed by the user, call the appropriate function of the parent class <App>
    sortChanged(e) {
        let param = e.target.id;
        this.props.onSortChange(param);
    }

    //when text is entered into the search bar, call the appropriate function of the parent class <App>
    textChanged(e) {
        let text = e.target.value;
        this.props.onTextChange(text);
    }
}
export default SortBy;