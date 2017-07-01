'use strict';
import React from 'react';
import * as Nav from '../../../../../routing/navigation';
import { ListPanel, ListPanelItem } from '../../../../../common/listPanel';
import PerformerStore from '../../../../../data/stores/performerStore';
import Button from '../../../../../common/button';
import * as PerformerUtil from './performer/performerUtil';

class PerformersBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddPerformerClick = this.handleAddPerformerClick.bind(this);   
        this.getContestantId = this.getContestantId.bind(this);
        this.getContestId = this.getContestId.bind(this); 
        this.getShowId = this.getShowId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        PerformerStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        PerformerStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { performers: PerformerStore.getContestantPerformers(this.getContestantId()) };
    }

    getContestantId(){
        return this.props.contestantId;
    }

    getContestId(){
        return this.props.contestId;
    }

    getShowId(){
        return this.props.showId;
    }

    handleAddPerformerClick(e){
        e.preventDefault();
        Nav.goToAddPerformer(this.getShowId(), this.getContestId(), this.getContestantId());
    }

    render() {
        var showId = this.getShowId();
        var contestId =  this.getContestId();
        var contestantId =  this.getContestantId();

        var performers = this.state.performers.map(function (performer) {
            return (
                <ListPanelItem 
                    key={performer.Id} 
                    name={PerformerUtil.getName(performer)} 
                    description={PerformerUtil.getDescription(performer)} 
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/performer/' + performer.Id + '/edit' } />
            );
        });

        var addPerformerButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addPerformer" value="Add" onClick={this.handleAddPerformerClick} /> );

        return ( <ListPanel title="Performers" items={performers} button={addPerformerButton} /> );
    }
}

export default PerformersBox;