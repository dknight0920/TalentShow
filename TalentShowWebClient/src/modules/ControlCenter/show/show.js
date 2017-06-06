import React from 'react';
import * as Nav from '../../../routing/navigation';
import ContestsBox from './contests';
import ShowStore from '../../../data/stores/showStore';
import * as ShowActions from '../../../data/actions/showActions';
import * as ContestActions from '../../../data/actions/contestActions';
import PageContent from '../../../common/pageContent';
import Button from '../../../common/button';
import TimeoutComponent from '../../../common/timeoutComponent';

class ShowPage extends TimeoutComponent {
    constructor(props) {
        super(props);
        this.getState = this.getState.bind(this);
        this.storeChanged = this.storeChanged.bind(this);
        this.getShow = this.getShow.bind(this);
        this.getShowId = this.getShowId.bind(this);
        this.getLoadingPageContent = this.getLoadingPageContent.bind(this);
        this.getFailedToLoadPageContent = this.getFailedToLoadPageContent.bind(this);
        this.handleEditShowClick = this.handleEditShowClick.bind(this);
        this.handleRemoveShowClick = this.handleRemoveShowClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentWillMount(){
        ShowStore.on("change", this.storeChanged);
        var showId = this.getShowId();
        ShowActions.loadShow(showId);
        ShowActions.joinHubGroup();
        ContestActions.loadShowContests(showId);
        ContestActions.joinHubGroup(showId);
    }

    componentWillUnmount(){
        this.resetTimeout();
        ShowStore.off("change", this.storeChanged);
        ShowActions.leaveHubGroup();
        ContestActions.leaveHubGroup(this.getShowId());
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

    getLoadingPageContent() {
        this.initTimeout(10000);

        return (
            <PageContent title="Loading" description="The show's details are loading, please wait."></PageContent>
        );
    }

    getFailedToLoadPageContent() {
        this.initTimeout(5000, function(){
            Nav.goToShows();
        });

        return (
            <PageContent title="Failed to Load Show" description="The requested show could not be loaded in a timely manner. The show may not exist. You will be automatically redirected shortly."></PageContent>
        );
    }

    handleEditShowClick(e){
        e.preventDefault();
        Nav.goToEditShow(this.getShowId());
    }

    handleRemoveShowClick(e){
        e.preventDefault();
        ShowActions.removeShow(this.getShowId());
        Nav.goToShows();
    }

    render() {
        this.resetTimeout();

        if (this.hasTimedOut){
            return this.getFailedToLoadPageContent();
        }

        if (!this.state || !this.state.show){      
            return this.getLoadingPageContent();
        }

        var show = this.state.show;

        var authorizedRolesForButtons = ["admin"];
        var showPageButtons = ( 
            <span>
                <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="editShow" value="Edit" onClick={this.handleEditShowClick} /> <Button type="primary" authorizedRoles={authorizedRolesForButtons} name="removeShow" value="Remove" onClick={this.handleRemoveShowClick} />
            </span>
        );

        return (
            <PageContent title={"Show: " + show.Name} description={show.Description} buttons={showPageButtons}>
                <ContestsBox showId={show.Id} />
            </PageContent>
        );
    }
}

export default ShowPage;