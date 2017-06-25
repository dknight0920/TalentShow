'use strict';
import React from 'react';
import Clone from 'clone';
import ScoreCardStore from '../../../../../../data/stores/scoreCardStore';
import Panel from '../../../../../../common/panel';
import Input from '../../../../../../common/input';

class ScorableCriteria extends React.Component {
    constructor(props) {
        super(props);
        this.getScoreCard = this.getScoreCard.bind(this);
        this.handleChange = this.handleChange.bind(this);    
        this.state = { scoreCard: this.getScoreCard() };
    }

    getScoreCard() {
        return this.props.scoreCard;
    }
    
    handleChange() {
        this.props.onChange(this.state.scoreCard);
    }

    render() {
        var key = 0;
        var changeHandler = this.handleChange;
        var scorableCriteria = this.state.scoreCard.ScorableCriteria.map(function (scorableCriterion) {
            return (<ScorableCriterion key={key++} scorableCriterion={scorableCriterion} onChange={changeHandler}/>);
            });

        return (
           <div>{scorableCriteria}</div>
        );
    }
}

class ScorableCriterion extends React.Component {
    constructor(props) {
        super(props);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.changeState = this.changeState.bind(this);
        this.state = { scorableCriterion: this.props.scorableCriterion };
    }

    handleCommentChange(e) {
        var scorableCriterion = this.state.scorableCriterion;
        scorableCriterion.Comment = e.target.value;
        this.changeState(scorableCriterion);
    }

    handleScoreChange(e) {
        var scorableCriterion = this.state.scorableCriterion;
        scorableCriterion.Score = e.target.value;
        this.changeState(scorableCriterion);
    }

    changeState(scorableCriterion) {
        this.setState(scorableCriterion);
        this.handleStateChange();
    }
    
    handleStateChange() {
        this.props.onChange();
    }

    render() {
        var scorableCriterion = this.state.scorableCriterion;
        return (
            <Panel title={scorableCriterion.ScoreCriterion.CriterionDescription}>
                <Input 
                    name="comment" 
                    type="text"
                    label="Comment"
                    value={scorableCriterion.Comment}
                    onChange={this.handleCommentChange} />

                <Input 
                    name="score"
                    type="number"
                    label="Score"
                    value={scorableCriterion.Score}
                    onChange={this.handleScoreChange} />
            </Panel>
        );
    }
}

export default ScorableCriteria;