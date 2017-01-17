import React from 'react';
import { ListPanel, ListPanelItem } from '../../../common/listPanel';
import ContestStore from '../../../data/stores/contestStore';

class ContestsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: ContestStore.getAll() };
    }

    render() {
        var showId = this.props.showId;
        var contests = this.state.data.map(function (contest) {
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