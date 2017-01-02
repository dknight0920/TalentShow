import EventEmitter from 'event-emitter';
import Dispatcher from '../dispatcher';

class ShowStore extends EventEmitter {
    constructor(){
        super();
        this.shows = [
            {
                Id: 3,
                Name: "Talent Show 2018", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 2,
                Name: "Talent Show 2017", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            },
            {
                Id: 1,
                Name: "Talent Show 2016", 
                Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " 
            }];
    }
}

const showStore = new ShowStore;

showStore.getAll = function(){
    return this.shows;
};

showStore.get = function(id){
    var show = null;

    for (var i = 0; i < this.shows.length; i++){
        var currentShow = this.shows[i];
        if(currentShow.Id == id){
            show = currentShow;
            break;
        }
    }

    return show;
};

showStore.handleAction = function(action){
    console.log("Need to handle action here", action);
};

Dispatcher.register(showStore.handleAction.bind(showStore));

export default showStore;