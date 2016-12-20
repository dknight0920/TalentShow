import React from 'react';
import { Link  } from 'react-router';

class ShowsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [
            {
                Id: 3,
                Name: "Talent Show 2018", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 2,
                Name: "Talent Show 2017", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 1,
                Name: "Talent Show 2016", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            }] 
        };
    }

    render() {
        return (
            <div className="showsBox">
            <h1>Talent Shows</h1>
            <ShowList data={this.state.data} />
            </div>
        );
    }
}

class ShowList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var showNodes = this.props.data.map(function (show) {
            return (<Show key={show.Id} data={show}/>);
        });
        return (
            <div className="showList">
                <div className="list-group">
                    {showNodes}
                </div>
            </div>
        );
    }
}

class Show extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var show = this.props.data;
        return (
            <div className="show">
                <Link to={{ pathname: '/show/' + show.Id }} className="list-group-item">
                    <h4 className="list-group-item-heading">{show.Name}</h4>
                    <p className="list-group-item-text">{show.Description}</p>
                </Link>    
            </div>
        );
    }
}

class ShowsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ShowsBox/>);
    }
}

export default ShowsPage;