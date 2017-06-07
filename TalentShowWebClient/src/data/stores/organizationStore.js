'use strict';
import Clone from 'clone';
import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class OrganizationStore extends EventEmitter {
    constructor(){
        super();
        this.organizations = [];

        var self = this;

        this.setOrganizations = function(organizations){
            self.organizations = organizations;         
            self.emit("change");
        };

        this.pushOrganizations = function(_organizations){
            for (var i = 0; i < _organizations.length; i++){
                this.pushOrganization(_organizations[i]);
            }
        };

        this.pushOrganization = function(organization){
            var clonedOrganizations = Clone(self.organizations);
            var remainingOrganizations = clonedOrganizations.filter((o) => !self.isMatchingOrganization(o, organization.Id));
            remainingOrganizations.push(organization);
            self.setOrganizations(remainingOrganizations);
        };

        this.removeOrganization = function(organizationId){
            var clonedOrganizations = Clone(self.organizations);
            var remainingOrganizations = clonedOrganizations.filter((o) => !self.isMatchingOrganization(o, organizationId));
            self.setOrganizations(remainingOrganizations);
        };

        this.isMatchingOrganization = function(organization, organizationId){
            return (organization.Id == organizationId);
        };

        this.getOrganizations = function(){
            return self.organizations.sort((a, b) => a.Id - b.Id);
        };

        this.get = function(organizationId){
            return Clone(self.organizations.find((organization) => self.isMatchingJudge(organization, organizationId)));
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_ORGANIZATIONS":
                    //TODO
                    break;
                case "LOAD_ORGANIZATIONS_SUCCESS":
                    self.pushOrganizations(action.organizations);
                    break;
                case "LOAD_ORGANIZATIONS_FAIL":
                    //TODO
                    break;
                case "LOAD_ORGANIZATION":
                    //TODO
                    break;
                case "LOAD_ORGANIZATION_SUCCESS":
                    this.pushOrganization(action.organization);
                    break;
                case "LOAD_ORGANIZATION_FAIL":
                    //TODO
                    break;
                case "ADD_ORGANIZATION":
                    //TODO
                    break;
                case "ADD_ORGANIZATION_SUCCESS":
                    self.pushOrganization(action.organization);
                    BroadcastUtil.broadcastOrganizationChange(action.groupName);
                    break;
                case "ADD_ORGANIZATION_FAIL":
                    //TODO
                    break;
                case "UPDATE_ORGANIZATION":
                    //TODO
                    break;
                case "UPDATE_ORGANIZATION_SUCCESS":
                    self.pushOrganization(action.organization);
                    BroadcastUtil.broadcastOrganizationChange(action.groupName);
                    break;
                case "UPDATE_ORGANIZATION_FAIL":
                    //TODO
                    break;
                case "REMOVE_ORGANIZATION":
                    //TODO
                    break;
                case "REMOVE_ORGANIZATION_SUCCESS":
                    self.removeOrganization(action.organizationId);
                    BroadcastUtil.broadcastOrganizationChange(action.groupName);
                    break;
                case "REMOVE_ORGANIZATION_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new OrganizationStore();