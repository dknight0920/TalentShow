import React from 'react';

class ShowsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    render() {
        return (
            <div className="showsBox">
            <h1>Shows</h1>
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
        return (<div className="showList">{showNodes}</div>);
    }
}

class Show extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var show = this.props.data;
        return (<div className="show">{show.Name}</div>);
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