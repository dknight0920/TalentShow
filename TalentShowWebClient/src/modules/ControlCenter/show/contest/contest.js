import React from 'react';

class ContestPage extends React.Component {
    constructor(props) {
        super(props);
        this.getContest = this.getContest.bind(this);
        this.state = { contest: this.getContest() };
    }

    getContest() {
        var contestId = this.props.params.contestId;

        var contest = null;

        var contests = [
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

        for (var i = 0; i < contests.length; i++){
            var currentContest = contests[i];
            if(currentContest.Id == contestId){
                contest = currentContest;
                break;
            }
        }

        return contest;
    }

    render() {
        var contest = this.state.contest;
        return (
            <div>
                <h1>{contest.Name}</h1>
                <p>{contest.Description}</p>
            </div>
        );
    }
}

export default ContestPage;