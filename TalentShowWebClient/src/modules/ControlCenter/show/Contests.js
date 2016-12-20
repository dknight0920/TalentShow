import React from 'react';
import { Link  } from 'react-router';

class ContestsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [
            {
                Id: 3,
                Name: "Music", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 2,
                Name: "Dance", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 1,
                Name: "Design", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            }] 
        };
    }

    render() {
        return (
            <div className="contestsBox">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Contests</h3>
                    </div>
                    <div className="panel-body">
                       <ContestList showId={this.props.showId} data={this.state.data} />
                    </div>
                </div>               
            </div>
        );
    }
}

class ContestList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var showId = this.props.showId;
        var contestNodes = this.props.data.map(function (contest) {
            return (<ContestNode key={contest.Id}  showId={showId} data={contest}/>);
        });
        return (
            <div className="contestList">
                <div className="list-group">
                    {contestNodes}
                </div>
            </div>
        );
    }
}

class ContestNode extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var showId =  this.props.showId;
        var contest = this.props.data;
        return (
            <Link to={{ pathname: '/show/' + showId + '/contest/' + contest.Id }} className="list-group-item">
                <h4 className="list-group-item-heading">{contest.Name}</h4>
                <p className="list-group-item-text">{contest.Description}</p>
            </Link>
        );
    }
}

export default ContestsBox;