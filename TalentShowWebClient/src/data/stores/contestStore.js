﻿import EventEmitter from 'event-emitter';

class ContestStore extends EventEmitter {
    constructor(){
        super();
        this.contests = [
            {
                Id: 3,
                Name: "Music", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 2,
                Name: "Dance", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 1,
                Name: "Design", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            }];
    }
}

const contestStore = new ContestStore;

contestStore.getAll = function(){
    return this.contests;
};

contestStore.get = function(id){
    var contest = null;

    for (var i = 0; i < this.contests.length; i++){
        var currentContest = this.contests[i];
        if(currentContest.Id == id){
            contest = currentContest;
            break;
        }
    }

    return contest;
};

export default contestStore;