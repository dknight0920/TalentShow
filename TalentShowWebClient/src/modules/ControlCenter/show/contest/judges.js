import React from 'react';
import { ListPanel, ListPanelItem } from '../../../../common/listPanel';
import ContestStore from '../../../../data/stores/contestStore';
import * as JudgeUtil from './judge/judgeUtil';

class JudgesBox extends React.Component {

    constructor(props) {
        super(props);
        this.setJudges = this.setJudges.bind(this);
        this.getJudges = this.getJudges.bind(this);  
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getJudges();
    }

    componentWillMount(){
        ContestStore.on("change", this.storeChanged);
    }

    componentWillUnmount(){
        ContestStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setJudges();
    }

    setJudges(){
        this.setState(this.getJudges());
    }

    getJudges(){
        return { judges: ContestStore.get(this.props.contestId).Judges };
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