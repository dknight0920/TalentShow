'use strict';
import Clone from 'clone';
import ChangeEventEmitter from './utils/changeEventEmitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class DivisionStore extends ChangeEventEmitter {
    constructor(){
        super();
        this.divisions = [];

        var self = this;

        this.setDivisions = function(divisions){
            self.divisions = divisions;
            self.emitChange();
        };

        this.pushDivisions = function(_divisions){
            for (var i = 0; i < _divisions.length; i++){
                this.pushDivision(_divisions[i]);
            }
        };

        this.pushDivision = function(division){
            var clonedDivisions = Clone(self.divisions);
            var remainingDivisions = clonedDivisions.filter((s) => s.Id != division.Id);
            remainingDivisions.push(division);
            self.setDivisions(remainingDivisions);
        };

        this.removeDivision = function(divisionId){
            var clonedDivisions = Clone(self.divisions);
            var remainingDivisions = clonedDivisions.filter((s) => s.Id != divisionId);
            self.setDivisions(remainingDivisions);
        };

        this.getDivisions = function(){
            return self.divisions.sort((a, b) => a.Id - b.Id);
        };

        this.get = function(divisionId){
            if(self.divisions.find){
                return Clone(self.divisions.find((division) => division.Id == divisionId));
            } else { //browser does not support find
                for (var i = 0; i < self.divisions.length; i++) {
                    var division = self.divisions[i];
                    if(division.Id == divisionId){
                        return Clone(division);
                    }
                }
            }
            return null;
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_DIVISIONS":
                    //TODO
                    break;
                case "LOAD_DIVISIONS_SUCCESS":
                    self.pushDivisions(action.divisions);
                    break;
                case "LOAD_DIVISIONS_FAIL":
                    //TODO
                    break;
                case "LOAD_DIVISION":
                    //TODO
                    break;
                case "LOAD_DIVISION_SUCCESS":
                    self.pushDivision(action.division);
                    break;
                case "LOAD_DIVISION_FAIL":
                    //TODO
                    break;
                case "ADD_DIVISION":
                    //TODO
                    break;
                case "ADD_DIVISION_SUCCESS":
                    self.pushDivision(action.division);
                    BroadcastUtil.broadcastDivisionChange(action.groupName);
                    break;
                case "ADD_DIVISION_FAIL":
                    //TODO
                    break;
                case "UPDATE_DIVISION":
                    //TODO
                    break;
                case "UPDATE_DIVISION_SUCCESS":
                    self.pushDivision(action.division);
                    BroadcastUtil.broadcastDivisionChange(action.groupName);
                    break;
                case "UPDATE_DIVISION_FAIL":
                    //TODO
                    break;
                case "REMOVE_DIVISION":
                    //TODO
                    break;
                case "REMOVE_DIVISION_SUCCESS":
                    self.removeDivision(action.divisionId);
                    BroadcastUtil.broadcastDivisionChange(action.groupName);
                    break;
                case "REMOVE_DIVISION_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new DivisionStore();