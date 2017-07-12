'use strict';
import React from 'react';
import * as Nav from '../../../../routing/navigation';
import { ListPanel, ListPanelItem } from '../../../../common/listPanel';
import JudgeStore from '../../../../data/stores/judgeStore';
import UserStore from '../../../../data/stores/userStore';
import Button from '../../../../common/button';
import * as JudgeUtil from './judge/judgeUtil';

class JudgesBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddJudgeClick = this.handleAddJudgeClick.bind(this); 
        this.getContestId = this.getContestId.bind(this); 
        this.getShowId = this.getShowId.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        JudgeStore.on("change", this.storeChanged);
        UserStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        JudgeStore.off("change", this.storeChanged);
        UserStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { judges: JudgeStore.getContestJudges(this.getContestId()) };
    }

    getContestId(){
        return this.props.contestId;
    }

    getShowId(){
        return this.props.showId;
    }

    handleAddJudgeClick(e){
        e.preventDefault();
        Nav.goToAddJudge(this.getShowId(), this.getContestId());
    }

    render() {
        var showId = this.getShowId();
        var contestId =  this.getContestId();

        var judges = this.state.judges.map(function (judge) {
            var user = UserStore.get(judge.UserId);
            if(user){
                return (
                    <ListPanelItem 
                        key={judge.Id} 
                        name={JudgeUtil.getName(judge, user)} 
                        description={JudgeUtil.getDescription(user)} 
                        pathname={ '/show/' + showId + '/contest/' + contestId + '/judge/' + judge.Id } />
                );
            }
            return (
                <ListPanelItem 
                    key={judge.Id} 
                    name={judge.Id} 
                    description={"User Id: " + judge.UserId} 
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/judge/' + judge.Id } />
            );;
        });

        var addJudgeButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addJudge" value="Add" onClick={this.handleAddJudgeClick} /> );

        return ( <ListPanel title="Judges" items={judges} button={addJudgeButton} /> );
    }
}

export default JudgesBox;