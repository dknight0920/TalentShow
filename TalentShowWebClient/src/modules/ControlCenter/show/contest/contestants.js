import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../common/listPanel';
import ContestantStore from '../../../../data/stores/contestantStore';
import * as ContestantActions from '../../../../data/actions/contestantActions';
import * as ContestantUtil from './contestant/contestantUtil';

class ContestantsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ContestantStore.on("change", this.storeChanged);
        ContestantActions.loadContestContestants(this.props.contestId);
    }

    componentWillUnmount(){
        ContestantStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contestants: ContestantStore.getContestContestants() };
    }

    render() {
        var showId = this.props.showId;
        var contestId =  this.props.contestId;

        var contestants = this.state.contestants.map(function (contestant) {
            return (
                <ListPanelItem 
                    key={contestant.Id} 
                    name={ContestantUtil.getName(contestant)} 
                    description={ContestantUtil.getDescription(contestant)} 
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/contestant/' + contestant.Id } />
            );
        });

        return ( <ListPanel title="Contestants" items={contestants} /> );
    }
}

export default ContestantsBox;