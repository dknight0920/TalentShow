import React from 'react';
import Panel from '../../../../common/panel';
import { ListGroup, ListItem, ItemHeading, ItemText } from '../../../../common/listGroup';
import ContestantStore from '../../../../data/stores/contestantStore';

class ContestantsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { contestants: ContestantStore.getAll() };
    }

    render() {
        return (
            <div className="contestantsBox">
                <Panel title="Contestants">
                    <ContestantList showId={this.props.showId} contestId={this.props.contestId} contestants={this.state.contestants} />
                </Panel>             
            </div>
        );
    }
}

class ContestantList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var showId = this.props.showId;
        var contestId =  this.props.contestId;

        var contestantNodes = this.props.contestants.map(function (contestant) {
                return (<ContestantNode key={contestant.Id}  showId={showId} contestId={contestId} contestant={contestant}/>);
            });

        return (
            <div className="contestantList">
                <ListGroup>{contestantNodes}</ListGroup>
            </div>
        );
    }
}

class ContestantNode extends React.Component {

    constructor(props) {
        super(props);
        this.getItemHeader = this.getItemHeader.bind(this);
        this.getItemText = this.getItemText.bind(this);
    }

    getItemHeader(contestant) {
        var performerNames = "";

        for (var i = 0; i < contestant.Performers.length; i++) {
            var performerName = contestant.Performers[i].Name;
            if(i > 0){
                performerNames += ", ";
            }
            performerNames += performerName.FirstName + " " + performerName.LastName; 
        }
        return contestant.Id + " - " + performerNames;
    }

    getItemText(contestant) {
        return contestant.Performance.Description;
    }

    render() {
        var showId =  this.props.showId;
        var contestId =  this.props.contestId;
        var contestant = this.props.contestant;
        return (
            <ListItem pathname={ '/show/' + showId + '/contest/' + contestId + '/contestant/' + contestant.Id }>
                <ItemHeading>{ this.getItemHeader(contestant) }</ItemHeading>
                <ItemText>{ this.getItemText(contestant) }</ItemText>
            </ListItem>
        );
    }
}

export default ContestantsBox;