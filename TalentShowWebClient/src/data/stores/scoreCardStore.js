import EventEmitter from 'event-emitter';

class ScoreCardStore extends EventEmitter {
    constructor(){
        super();
        this.scoreCards = [
            {
                Id: 1,
                Contestant: {
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
                Judge: {
                    Id: 1,
                    Name: {
                        FirstName: "Frank",
                        LastName: "Smith"
                    },
                    Affiliation: {
                        Id: 1,
                        Name: "ABC",
                        Parent: null
                    }
                },
                ScorableCriteria: [
                    {
                        Id: 1,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 2,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 3,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 4,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 5,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }
                ],
                AverageScore: 8,
                TotalScore: 24
            },
            {
                Id: 2,
                Contestant: {
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
                Judge: {
                    Id: 2,
                    Name: {
                        FirstName: "Jane",
                        LastName: "Smith"
                    },
                    Affiliation: {
                        Id: 1,
                        Name: "ABC",
                        Parent: null
                    }
                },
                ScorableCriteria: [
                    {
                        Id: 1,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 2,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 3,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 4,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 5,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }
                ],
                AverageScore: 8,
                TotalScore: 24
            },
            {
                Id: 3,
                Contestant: {
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
                Judge: {
                    Id: 3,
                    Name: {
                        FirstName: "Tom",
                        LastName: "Bob"
                    },
                    Affiliation: {
                        Id: 1,
                        Name: "ABC",
                        Parent: null
                    }
                },
                ScorableCriteria: [
                    {
                        Id: 1,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 2,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 3,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 4,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    },
                    {
                        Id: 5,
                        ScoreCriterion: {
                            Id: 1,
                            CriterionDescription: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                            ScoreRange: {
                                Min: 0,
                                Max: 10
                            }
                        },
                        Score: 8,
                        Comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }
                ],
                AverageScore: 8,
                TotalScore: 24
            }];
    }
}

const scoreCardStore = new ScoreCardStore;

scoreCardStore.getAll = function(){
    return this.scoreCards;
};

scoreCardStore.get = function(id){
    var scoreCard = null;

    for (var i = 0; i < this.scoreCards.length; i++){
        var currentscoreCard = this.scoreCards[i];
        if(currentscoreCard.Id == id){
            scoreCard = currentscoreCard;
            break;
        }
    }

    return scoreCard;
};

export default scoreCardStore;