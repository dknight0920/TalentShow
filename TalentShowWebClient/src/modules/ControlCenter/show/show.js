import React from 'react';
import ContestsBox from './contests';
import ShowStore from '../../../data/stores/showStore';

class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.getShow = this.getShow.bind(this);
        this.state = { show: this.getShow() };
    }

    getShow() {
        var showId = this.props.params.showId;
        return ShowStore.get(showId);
    }

    render() {
        var show = this.state.show;
        return (
            <div>
                <h1>{show.Name}</h1>
                <p>{show.Description}</p>
                <hr />
                <ContestsBox showId={show.Id} />
            </div>
        );
    }
}

export default ShowPage;