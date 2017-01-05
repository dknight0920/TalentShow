import EventEmitter from 'event-emitter';

class ContestantStore extends EventEmitter {
    constructor(){
        super();
        this.contestants = [
            {
                Id: 1,
                Performance: {
                    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }, 
                Performers: [
                    {
                        Name:{
                            FirstName: "Jeff",
                            LastName: "Smith"
                        }
                    },
                    {
                        Name:{
                            FirstName: "Sammy",
                            LastName: "Bob"
                        }
                    }
                ]
            },
            {
                Id: 2,
                Performance: {
                    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }, 
                Performers: [
                    {
                        Name:{
                            FirstName: "Jimmy",
                            LastName: "John"
                        }
                    },
                    {
                        Name:{
                            FirstName: "Bobby",
                            LastName: "Boy"
                        }
                    }
                ]
            },
            {
                Id: 3,
                Performance: {
                    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                }, 
                Performers: [
                    {
                        Name:{
                            FirstName: "Sandy",
                            LastName: "Mandy"
                        }
                    },
                    {
                        Name:{
                            FirstName: "Jane",
                            LastName: "Doe"
                        }
                    }
                ]
            }];
    }
}

const contestantStore = new ContestantStore;

contestantStore.getAll = function(){
    return this.contestants;
};

contestantStore.get = function(id){
    var contestant = null;

    for (var i = 0; i < this.contestants.length; i++){
        var currentContestant = this.contestants[i];
        if(currentContestant.Id == id){
            contestant = currentContestant;
            break;
        }
    }

    return contestant;
};

export default contestantStore;