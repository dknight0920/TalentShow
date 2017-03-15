import React from 'react';
import * as Nav from '../../routing/navigation';
import ShowStore from '../../data/stores/showStore';
import * as ShowActions from '../../data/actions/showActions';
import { ListPanel, ListPanelItem } from '../../common/listPanel';
import Button from '../../common/button';
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
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.handleAddShowClick = this.handleAddShowClick.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ShowStore.on("change", this.storeChanged);
        ShowActions.loadAllShows();
    }

    componentWillUnmount(){
        ShowStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { shows: ShowStore.getAll() };
    }

    handleAddShowClick(e){
        e.preventDefault();
        Nav.goToAddShow();
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

        var addShowButton = ( <Button type="primary" authorizedRoles={["admin"]} name="addShow" value="Add" onClick={this.handleAddShowClick} /> );
            
        return ( <ListPanel title="Talent Shows" items={shows} button={addShowButton} /> );
    }
}

export default ShowsPage;