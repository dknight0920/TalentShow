'use strict';
import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../../../common/formGroup';
import Input from '../../../../../common/input';
import Button from '../../../../../common/button';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class ScoreCriterionEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getState = this.getState.bind(this);
        this.state =  this.getState();
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

    handleDescriptionChange(e) {
        var scoreCriterion = this.state.scoreCriterion;
        scoreCriterion.CriterionDescription = e.target.value;
        this.setState(scoreCriterion);
    }

    handleMinChange(e) {
        var scoreCriterion = this.state.scoreCriterion;
        scoreCriterion.ScoreRange.Min = e.target.value;
        this.setState(scoreCriterion);
    }

    handleMaxChange(e) {
        var scoreCriterion = this.state.scoreCriterion;
        scoreCriterion.ScoreRange.Max = e.target.value;
        this.setState(scoreCriterion);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.scoreCriterion);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.scoreCriterion){
            return { 
                scoreCriterion: Clone(this.props.scoreCriterion)    
            };
        } else {
            return {
                scoreCriterion: {
                    Id: 0,
                    CriterionDescription: "",
                    ScoreRange: {
                        Min: 0,
                        Max: 10
                    }
                }
            };
        }
    }

    render() {
        var scoreCriterion = this.state.scoreCriterion;

        return (
            <div>
                <Input 
                    name="description" 
                    type="text"
                    label="Description"
                    value={scoreCriterion.CriterionDescription}
                    onChange={this.handleDescriptionChange} />

                <Input 
                    name="min" 
                    type="number"
                    label="Minimum Score"
                    value={scoreCriterion.ScoreRange.Min}
                    onChange={this.handleMinChange} />

                <Input 
                    name="max" 
                    type="number"
                    label="Maximum Score"
                    value={scoreCriterion.ScoreRange.Max}
                    onChange={this.handleMaxChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default ScoreCriterionEditor;