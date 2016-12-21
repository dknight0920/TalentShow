import React from 'react';
import Panel from '../../../common/panel';
import { ListGroup, ListItem, ItemHeading, ItemText } from '../../../common/listGroup';

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
                <Panel title="Contests">
                    <ContestList showId={this.props.showId} data={this.state.data} />
                </Panel>             
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
                <ListGroup>
                    {contestNodes}
                </ListGroup>
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
            <ListItem pathname={ '/show/' + showId + '/contest/' + contest.Id }>
                <ItemHeading>{contest.Name}</ItemHeading>
                <ItemText>{contest.Description}</ItemText>
            </ListItem>
        );
    }
}

export default ContestsBox;