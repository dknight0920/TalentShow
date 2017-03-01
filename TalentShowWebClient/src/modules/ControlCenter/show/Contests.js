import React from 'react';
import { hashHistory } from 'react-router';
import { ListPanel, ListPanelItem } from '../../../common/listPanel';
import Button from '../../../common/button';
import ContestStore from '../../../data/stores/contestStore';
import * as ContestActions from '../../../data/actions/contestActions';

class ContestsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddContestClick = this.handleAddContestClick.bind(this);
        this.state = this.getState();
        this.hubConnection = $.hubConnection(globalWebApiBaseUrl);     
        this.contestsHubProxy = this.hubConnection.createHubProxy('contestsHub')
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
        console.log("ContestsBox WillMount showId: " + this.props.showId);
        ContestActions.loadShowContests(this.props.showId);
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
    }

    componentDidMount(){
        var self = this;

        this.contestsHubProxy.on('contestsChanged', function() {
            console.log('Client Function Invoked.');
            console.log("contestsHubProxy DidMount showId: " + self.props.showId);
            ContestActions.loadShowContests(self.props.showId); 
        });
 
        this.hubConnection.start({ jsonp: true })
            .done(function(){ 
                console.log('Connected');
                self.contestsHubProxy.invoke('JoinGroup', self.props.showId);
            })
            .fail(function(){ 
                console.log('Could not connect'); 
            });
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contests: ContestStore.getShowContests() };
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