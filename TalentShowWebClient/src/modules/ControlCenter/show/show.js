import React from 'react';
import { Link } from 'react-router';

class ShowsPage extends React.Component {
    constructor(props) {
        super(props);
        this.getShow = this.getShow.bind(this);
        this.state = { show: this.getShow() };
    }

    getShow() {
        var showId = this.props.params.showId;

        var show = null;

        var shows = [
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

        for (var i = 0; i < shows.length; i++){
            var currentShow = shows[i];
            if(currentShow.Id == showId){
                show = currentShow;
                break;
            }
        }

        return show;
    }

    render() {
        var show = this.state.show;
        return (
            <div>
                <h1>{show.Name}</h1>
                <p>{show.Description}</p>
            </div>
        );
    }
}

export default ShowsPage;