import React from 'react';
import { ListPanel, ListPanelItem } from '../../../common/listPanel';
import ContestStore from '../../../data/stores/contestStore';
import * as ContestActions from '../../../data/actions/contestActions';

class ContestsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
        ContestActions.loadShowContests(this.props.showId);
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contests: ContestStore.getShowContests() };
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

        return ( <ListPanel title="Contests" items={contests} /> );
    }
}

export default ContestsBox;