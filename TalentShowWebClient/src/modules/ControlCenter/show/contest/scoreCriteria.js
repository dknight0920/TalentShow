import React from 'react';
import * as Nav from '../../../../routing/navigation';
import { ListPanel, ListPanelItem } from '../../../../common/listPanel';
import ScoreCriterionStore from '../../../../data/stores/scoreCriterionStore';
import Button from '../../../../common/button';

class ScoreCriteriaBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddScoreCriterionClick = this.handleAddScoreCriterionClick.bind(this); 
        this.getContestId = this.getContestId.bind(this); 
        this.getShowId = this.getShowId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ScoreCriterionStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        ScoreCriterionStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { scoreCriteria: ScoreCriterionStore.getContestScoreCriteria(this.getContestId()) };
    }

    getContestId(){
        return this.props.contestId;
    }

    getShowId(){
        return this.props.showId;
    }

    handleAddScoreCriterionClick(e){
        e.preventDefault();
        Nav.goToAddScoreCriterion(this.getShowId(), this.getContestId());
    }

    render() {
        var showId = this.getShowId();
        var contestId =  this.getContestId();

        var scoreCriteria = this.state.scoreCriteria.map(function (scoreCriterion) {
            return (
                <ListPanelItem 
                    key={scoreCriterion.Id} 
                    name={scoreCriterion.CriterionDescription} 
                    description={"Min: " + scoreCriterion.ScoreRange.Min + " Max: " + scoreCriterion.ScoreRange.Max} 
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/scorecriterion/' + scoreCriterion.Id } />
            );
        });

        var addScoreCriterionButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addScoreCriterion" value="Add" onClick={this.handleAddScoreCriterionClick} /> );

        return ( <ListPanel title="Score Criteria" items={scoreCriteria} button={addScoreCriterionButton} /> );
    }
}

export default ScoreCriteriaBox;