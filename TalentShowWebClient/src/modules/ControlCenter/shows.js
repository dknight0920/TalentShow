import React from 'react';
import { ListGroup, ListItem, ItemHeading, ItemText } from '../../common/listGroup';

class ShowsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [
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
            }] 
        };
    }

    render() {
        return (
            <div className="showsBox">
                <h1>Talent Shows</h1>
                <ShowList data={this.state.data} />
            </div>
        );
    }
}

class ShowList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var showNodes = this.props.data.map(function (show) {
            return (<Show key={show.Id} data={show}/>);
        });
        return (
            <div className="showList">
                <ListGroup>
                    {showNodes}
                </ListGroup>
            </div>
        );
    }
}

class Show extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var show = this.props.data;
        return (
            <ListItem pathname={ '/show/' + show.Id  }>
                <ItemHeading>{show.Name}</ItemHeading>
                <ItemText>{show.Description}</ItemText>
            </ListItem>
        );
    }
}

class ShowsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<ShowsBox/>);
    }
}

export default ShowsPage;