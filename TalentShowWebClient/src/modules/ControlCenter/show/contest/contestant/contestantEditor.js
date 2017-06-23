'use strict';
import React from 'react';
import Clone from 'clone';
import FormGroup from '../../../../../common/formGroup';
import Input from '../../../../../common/input';
import Button from '../../../../../common/button';
import RoleAwareComponent from '../../../../../common/roleAwareComponent';

class ContestantEditor extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.handlePerformanceDescriptionChange = this.handlePerformanceDescriptionChange.bind(this);
        this.handlePerformanceDurationChange = this.handlePerformanceDurationChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
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

    storeChanged(){
        this.setState(this.getState());
    }

    handlePerformanceDescriptionChange(e) {
        var contestant = this.state.contestant;
        contestant.Performance.Description = e.target.value;
        this.setState(contestant);
    }

    handlePerformanceDurationChange(e) {
        var contestant = this.state.contestant;
        contestant.Performance.Duration = e.target.value;
        this.setState(contestant);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.contestant);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.contestant){
            return { 
                contestant: Clone(this.props.contestant)    
            };
        } else {
            return {
                contestant: {
                    Id: 0,
                    Performance: {
                        Id: 0,
                        Description: "",
                        Duration: 0
                    }
                }
            };
        }
    }

    render() {
        var contestant = this.state.contestant;

        return (
            <div>
                <Input 
                    name="performanceDescription" 
                    type="text"
                    label="Performance Description"
                    value={contestant.Performance.Description}
                    onChange={this.handlePerformanceDescriptionChange} />

                <Input 
                    name="performanceDuration" 
                    type="number"
                    label="Performance Duration"
                    value={contestant.Performance.Duration}
                    onChange={this.handlePerformanceDurationChange} />

                <FormGroup>
                    <Button type="primary" authorizedRoles={this.authorizedRoles} name="save" value="Save" onClick={this.handleClickSave} />
                    {"  "}
                    <Button type="default" authorizedRoles={this.authorizedRoles} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                </FormGroup>
            </div>
        );
    }
}

export default ContestantEditor;