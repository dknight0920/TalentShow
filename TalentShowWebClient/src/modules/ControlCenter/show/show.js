﻿import React from 'react';
import { hashHistory } from 'react-router';
import ContestsBox from './contests';
import ShowStore from '../../../data/stores/showStore';
import * as ShowActions from '../../../data/actions/showActions';
import PageContent from '../../../common/pageContent';
import Button from '../../../common/button';

class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getShow = this.getShow.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.handleEditShowClick = this.handleEditShowClick.bind(this);
        this.state = this.getState();
    }

    componentWillMount(){
        ShowStore.on("change", this.storeChanged);
        ShowActions.loadShow(this.getShowId());
    }

    componentWillUnmount(){
        ShowStore.off("change", this.storeChanged);
    }

    storeChanged(){
        this.setState(this.getState());
    }

    getState(){
        return { show: this.getShow() };
    }

    getShow() {
        return ShowStore.get(this.getShowId());
    }

    getShowId() {
        return this.props.params.showId;
    }

    handleEditShowClick(e){
        e.preventDefault();
        hashHistory.push('/show/' + this.getShowId() + '/edit');
    }

    render() {
        var show = this.state.show;

        if (!show){
            return (
                <PageContent title="Loading" description="The show's details are loading, please wait."></PageContent>
            );
        }

        var editShowButton = ( <Button type="primary" authorizedRoles={["admin"]} name="editShow" value="Edit" onClick={this.handleEditShowClick} /> );

        return (
            <PageContent title={show.Name} description={show.Description} button={editShowButton}>
                <ContestsBox showId={show.Id} />
            </PageContent>
        );
            }
}

export default ShowPage;