'use strict';
import React from 'react';
import * as Nav from '../../../routing/navigation';
import DivisionEditor from './divisionEditor';
import DivisionStore from '../../../data/stores/divisionStore';
import * as DivisionActions from '../../../data/actions/divisionActions';
import PageContent from '../../../common/pageContent';
import RoleAwareComponent from '../../../common/roleAwareComponent';
import Button from '../../../common/button';

class EditDivisionPage extends RoleAwareComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getDivision = this.getDivision.bind(this);
        this.getDivisionId = this.getDivisionId.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.navigateToDivisionsPage = this.navigateToDivisionsPage.bind(this);
        this.authorizedRoles = ["admin"];
        this.state = this.getState();
    }

    componentWillMount(){
        this.redirectUnauthorizedUser();
        DivisionStore.on("change", this.storeChanged);
        DivisionActions.loadDivision(this.getDivisionId());
    }

    componentWillUnmount(){
        DivisionStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    handleClickRemove(e) {
        e.preventDefault();
        DivisionActions.removeDivision(this.getDivisionId());
        this.navigateToDivisionsPage();
    }

    handleClickSave(division) {
        DivisionActions.updateDivision(division);
        this.navigateToDivisionsPage();
    }

    handleClickCancel() {
        this.navigateToDivisionsPage();
    }

    navigateToDivisionsPage() {
        Nav.goToDivisions();
    }
    
    getState(){
        return { division: this.getDivision() };
    }

    getDivision() {
        return DivisionStore.get(this.getDivisionId());
    }

    getDivisionId() {
        return this.props.params.divisionId;
    }

    render() {
        var division = this.state.division;

        if (!division){
            return (
                <PageContent title="Loading" description="The division's details are loading, please wait."></PageContent>
            );
        }

        var removeDivisionButton = ( 
            <span>
                <Button type="primary" authorizedRoles={this.authorizedRoles} name="removeDivision" value="Remove" onClick={this.handleClickRemove} />
            </span>
        );

        return (
            <PageContent title="Edit a Division" description="Use the form below to edit the division." buttons={removeDivisionButton} >
                <DivisionEditor division={division} authorizedRoles={this.authorizedRoles} OnClickSave={this.handleClickSave} OnClickCancel={this.handleClickCancel}/>
            </PageContent>
        );
    }
}

export default EditDivisionPage;