'use strict';
import Clone from 'clone';
import ChangeEventEmitter from './utils/changeEventEmitter';
import Dispatcher from '../dispatcher';
import * as BroadcastUtil from './utils/broadcastUtil';

class UserStore extends ChangeEventEmitter {
    constructor(){
        super();
        this.users = [];

        var self = this;

        this.setUsers = function(users){
            self.users = users;
            self.emitChange();
        };

        this.pushUsers = function(_users){
            for (var i = 0; i < _users.length; i++){
                this.pushUser(_users[i]);
            }
        };

        this.pushUser = function(user){
            var clonedUsers = Clone(self.users);
            var remainingUsers = clonedUsers.filter((s) => s.Id != user.Id);
            remainingUsers.push(user);
            self.setUsers(remainingUsers);
        };

        this.removeUser = function(userId){
            var clonedUsers = Clone(self.users);
            var remainingUsers = clonedUsers.filter((s) => s.Id != userId);
            self.setUsers(remainingUsers);
        };

        this.getUsers = function(){
            return self.users.sort((a, b) => {
                if(a.Email < b.Email) return -1;
                if(a.Email > b.Email) return 1;
                return 0;
            });
        };

        this.get = function(userId){
            if(self.users.find){
                return Clone(self.users.find((user) => user.Id == userId));
            } else { //browser does not support find
                for (var i = 0; i < self.users.length; i++) {
                    var user = self.users[i];
                    if(user.Id == userId){
                        return Clone(user);
                    }
                }
            }
            return null;
        };

        this.handleAction = function(action){
            switch(action.type){
                case "LOAD_USERS":
                    //TODO
                    break;
                case "LOAD_USERS_SUCCESS":
                    self.pushUsers(action.users);
                    break;
                case "LOAD_USERS_FAIL":
                    //TODO
                    break;
                case "LOAD_USER":
                    //TODO
                    break;
                case "LOAD_USER_SUCCESS":
                    self.pushUser(action.user);
                    break;
                case "LOAD_USER_FAIL":
                    //TODO
                    break;
                case "ADD_USER":
                    //TODO
                    break;
                case "ADD_USER_SUCCESS":
                    self.pushUser(action.user);
                    BroadcastUtil.broadcastUserChange(action.groupName);
                    break;
                case "ADD_USER_FAIL":
                    //TODO
                    break;
                case "UPDATE_USER":
                    //TODO
                    break;
                case "UPDATE_USER_SUCCESS":
                    self.pushUser(action.user);
                    BroadcastUtil.broadcastUserChange(action.groupName);
                    break;
                case "UPDATE_USER_FAIL":
                    //TODO
                    break;
                case "REMOVE_USER":
                    //TODO
                    break;
                case "REMOVE_USER_SUCCESS":
                    self.removeUser(action.userId);
                    BroadcastUtil.broadcastUserChange(action.groupName);
                    break;
                case "REMOVE_USER_FAIL":
                    //TODO
                    break;
            }
        };

        Dispatcher.register(this.handleAction.bind(this));
    }  
}

export default  new UserStore();