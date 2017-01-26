import React from 'react';
import ScoreCardStore from '../../../../../../data/stores/scoreCardStore';
import Panel from '../../../../../../common/panel';
import Input from '../../../../../../common/input';

class ScorableCriteria extends React.Component {
    constructor(props) {
        super(props);
        this.getScorableCriteria = this.getScorableCriteria.bind(this);
        this.state = { scorableCriteria: this.getScorableCriteria() };
    }

    getScorableCriteria() {
        return ScoreCardStore.get(this.props.scoreCardId).ScorableCriteria;
    }

    render() {
        var key = 0;
        var scorableCriteria = this.state.scorableCriteria.map(function (scorableCriterion) {
            return (<ScorableCriterion key={key++} scorableCriterion={scorableCriterion} />);
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
        this.state = { scorableCriterion: this.props.scorableCriterion };
    }

    handleCommentChange(e) {
        var scorableCriterion = this.state.scorableCriterion;
        scorableCriterion.Comment = e.target.value;
        this.setState(scorableCriterion);
    }

    handleScoreChange(e) {
        var scorableCriterion = this.state.scorableCriterion;
        scorableCriterion.Score = e.target.value;
        this.setState(scorableCriterion);
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