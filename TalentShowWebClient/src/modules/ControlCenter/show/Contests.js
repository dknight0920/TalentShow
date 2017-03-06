import React from 'react';
import { hashHistory } from 'react-router';
import { ListPanel, ListPanelItem } from '../../../common/listPanel';
import Button from '../../../common/button';
import ContestStore from '../../../data/stores/contestStore';
import * as ContestActions from '../../../data/actions/contestActions';
import * as Hubs from '../../../data/signalr/hubs';

class ContestsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddContestClick = this.handleAddContestClick.bind(this);
        this.state = this.getState();  
        this.getcontestsHubGroupName = this.getcontestsHubGroupName.bind(this);
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadShowContests(this.props.showId);
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
        Hubs.contestsHubProxy.invoke('LeaveGroup', this.getcontestsHubGroupName());
    }

    componentDidMount(){ 
        Hubs.contestsHubProxy.invoke('JoinGroup', this.getcontestsHubGroupName());
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contests: ContestStore.getShowContests() };
    }

    getcontestsHubGroupName(){
        return "show_" + this.props.showId;
    }

    handleAddContestClick(e){
        e.preventDefault();
        hashHistory.push('show/' + this.props.showId + '/contests/add');
    }

    render() {
        var showId = this.props.showId;
        var contests = this.state.contests.map(function (contest) {
            return (
                <ListPanelItem 
                    key={contest.Id} 
                    name={contest.Name} 
                    description={contest.Description} 
                    pathname={ '/show/' + showId + '/contest/' + contest.Id } />
            );
        });

        var addContestButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addContest" value="Add" onClick={this.handleAddContestClick} /> );

        return ( <ListPanel title="Contests" items={contests} button={addContestButton}/> );
    }
}

export default ContestsBox;