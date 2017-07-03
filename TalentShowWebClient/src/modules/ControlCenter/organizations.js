'use strict';
import React from 'react';
import * as Nav from '../../routing/navigation';
import OrganizationStore from '../../data/stores/organizationStore';
import * as OrganizationActions from '../../data/actions/organizationActions';
import { ListPanel, ListPanelItem } from '../../common/listPanel';
import Button from '../../common/button';
import PageContent from '../../common/pageContent';

class OrganizationsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageContent title="Organizations" description="">
                <OrganizationsBox/>
            </PageContent>        
        );
    }
}

class OrganizationsBox extends React.Component {

    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddOrganizationClick = this.handleAddOrganizationClick.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        OrganizationStore.on("change", this.storeChanged);
        OrganizationActions.loadOrganizations();
        OrganizationActions.joinHubGroup();
    }

    componentWillUnmount(){
        OrganizationStore.off("change", this.storeChanged);
        OrganizationActions.leaveHubGroup();
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { organizations: OrganizationStore.getOrganizations() };
    }

    handleAddOrganizationClick(e){
        e.preventDefault();
        Nav.goToAddOrganization();
    }

    render() {
        var organizations = this.state.organizations.map(function (organization) {
            return (
                <ListPanelItem 
                    key={organization.Id} 
                    name={organization.Name} 
                    description=""
                    pathname={ '/organization/' + organization.Id + '/edit' } />
            );
        });

        var addOrganizationButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addOrganization" value="Add" onClick={this.handleAddOrganizationClick} /> );
            
        return ( <ListPanel title="Talent Organizations" items={organizations} button={addOrganizationButton} /> );
    }
}

export default OrganizationsPage;