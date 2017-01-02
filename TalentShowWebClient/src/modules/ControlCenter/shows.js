import React from 'react';
import { ListGroup, ListItem, ItemHeading, ItemText } from '../../common/listGroup';
import ShowStore from '../../data/stores/showStore';

class ShowsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: ShowStore.getAll() };
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