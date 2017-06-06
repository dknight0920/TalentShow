import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../common/listPanel';
import ContestantStore from '../../../../data/stores/contestantStore';
import * as ContestantUtil from './contestant/contestantUtil';

class ContestantsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this); 
        this.getContestId = this.getContestId.bind(this); 
        this.getShowId = this.getShowId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ContestantStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        ContestantStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { contestants: ContestantStore.getContestContestants(this.getContestId()) };
    }

    getContestId(){
        return this.props.contestId;
    }

    getShowId(){
        return this.props.showId;
    }

    render() {
        var showId = this.getShowId();
        var contestId =  this.getContestId();

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