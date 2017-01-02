import React from 'react';
import Panel from '../../../common/panel';
import { ListGroup, ListItem, ItemHeading, ItemText } from '../../../common/listGroup';
import ContestStore from '../../../data/stores/contestStore';

class ContestsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: ContestStore.getAll() };
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