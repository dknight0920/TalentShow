'use strict';
import React from 'react';
import * as Nav from '../../routing/navigation';
import DivisionStore from '../../data/stores/divisionStore';
import * as DivisionActions from '../../data/actions/divisionActions';
import { ListPanel, ListPanelItem } from '../../common/listPanel';
import Button from '../../common/button';
import PageContent from '../../common/pageContent';

class DivisionsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageContent title="Divisions" description="">
                <DivisionsBox/>
            </PageContent>        
        );
    }
}

class DivisionsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddDivisionClick = this.handleAddDivisionClick.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        DivisionStore.on("change", this.storeChanged);
        DivisionActions.loadDivisions();
        DivisionActions.joinHubGroup();
    }

    componentWillUnmount(){
        DivisionStore.off("change", this.storeChanged);
        DivisionActions.leaveHubGroup();
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { divisions: DivisionStore.getDivisions() };
    }

    handleAddDivisionClick(e){
        e.preventDefault();
        Nav.goToAddDivision();
    }

    render() {
        var divisions = this.state.divisions.map(function (division) {
            return (
                <ListPanelItem 
                    key={division.Id} 
                    name={division.Name} 
                    description=""
                    pathname={ '/division/' + division.Id + '/edit' } />
            );
        });

        var addDivisionButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addDivision" value="Add" onClick={this.handleAddDivisionClick} /> );
            
        return ( <ListPanel title="Talent Divisions" items={divisions} button={addDivisionButton} /> );
    }
}

export default DivisionsPage;