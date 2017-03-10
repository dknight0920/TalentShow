import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../common/listPanel';
import JudgeStore from '../../../../data/stores/judgeStore';
import * as JudgeUtil from './judge/judgeUtil';

class JudgesBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        JudgeStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        JudgeStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { judges: JudgeStore.getContestJudges() };
    }

    render() {
        var showId = this.props.showId;
        var contestId =  this.props.contestId;

        var judges = this.state.judges.map(function (judge) {
            return (
                <ListPanelItem 
                    key={judge.Id} 
                    name={JudgeUtil.getName(judge)} 
                    description={JudgeUtil.getDescription(judge)} 
                    pathname={ '/show/' + showId + '/contest/' + contestId + '/judge/' + judge.Id } />
            );
    });

    return ( <ListPanel title="Judges" items={judges} /> );
    }
}

export default JudgesBox;