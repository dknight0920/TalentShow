import React from 'react';
import ShowStore from '../../data/stores/showStore';
import { ListPanel, ListPanelItem } from '../../common/listPanel';
import PageContent from '../../common/pageContent';

class ShowsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <PageContent title="Talent Show Control Center" description="">
                <ShowsBox/>
            </PageContent>        
        );
    }
}

class ShowsBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = { shows: ShowStore.getAll() };
    }

    render() {
        var shows = this.state.shows.map(function (show) {
            return (
                <ListPanelItem 
                    key={show.Id} 
                    name={show.Name} 
                    description={show.Description} 
                    pathname={ '/show/' + show.Id  } />
            );
    });

    return ( <ListPanel title="Talent Shows" items={shows} /> );
    }
}

export default ShowsPage;