import React from 'react';
import ContestsBox from './contests';
import ShowStore from '../../../data/stores/showStore';
import PageContent from '../../../common/pageContent';

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
            <PageContent title={show.Name} description={show.Description}>
                <ContestsBox showId={show.Id} />
            </PageContent>
        );
    }
}

export default ShowPage;