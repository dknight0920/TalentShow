'use strict';
import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../../../../common/formGroup';
import Input from '../../../../../../common/input';
import Button from '../../../../../../common/button';
import RoleAwareComponent from '../../../../../../common/roleAwareComponent';
import ScorableCriteria from './scorableCriteria';

class ScoreCardEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleScorableCriteriaChange = this.handleScorableCriteriaChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.state = this.getState();
        this.authorizedRoles = [];
    }

    componentWillMount(){
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
        this.redirectUnauthorizedUser();
    }

    componentWillUnmount(){

    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleScorableCriteriaChange(scoreCard) {
      this.setState(scoreCard); 
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.scoreCard);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.scoreCard){
            return { 
                scoreCard: Clone(this.props.scoreCard)    
            };
        } else {
            return {
                scoreCard: {
                    Id: 0,
                    Contestant: Clone(this.props.contestant),
                    Judge: Clone(this.props.judge),
                    ScorableCriteria: Clone(this.props.scorableCriteria),
                    AverageScore: 0,
                    TotalScore: 0
                }
            };
        }
    }

    render() {
        return (
            <div>
                <ScorableCriteria scoreCard={this.state.scoreCard} onChange={this.handleScorableCriteriaChange}/>

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default ScoreCardEditor;