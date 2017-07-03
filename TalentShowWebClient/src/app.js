'use strict';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link  } from 'react-router';
import about from './modules/about';
import login from './modules/login';
import unauthorized from './common/unauthorizedUserPageContent';
import divisions from './modules/ControlCenter/divisions';
import addDivision from './modules/ControlCenter/division/addDivision';
import editDivision from './modules/ControlCenter/division/editDivision';
import organizations from './modules/ControlCenter/organizations';
import addOrganization from './modules/ControlCenter/organization/addOrganization';
import editOrganization from './modules/ControlCenter/organization/editOrganization';
import shows from './modules/ControlCenter/shows';
import show from './modules/ControlCenter/show/show';
import addShow from './modules/ControlCenter/show/addShow';
import editShow from './modules/ControlCenter/show/editShow';
import contest from './modules/ControlCenter/show/contest/contest';
import addContest from './modules/ControlCenter/show/contest/addContest';
import editContest from './modules/ControlCenter/show/contest/editContest';
import contestant from './modules/ControlCenter/show/contest/contestant/contestant';
import addContestant from './modules/ControlCenter/show/contest/contestant/addContestant';
import editContestant from './modules/ControlCenter/show/contest/contestant/editContestant';
import judge from './modules/ControlCenter/show/contest/judge/judge';
import addJudge from './modules/ControlCenter/show/contest/judge/addJudge'
import editJudge from './modules/ControlCenter/show/contest/judge/editJudge';
import scoreCriterion from './modules/ControlCenter/show/contest/scoreCriterion/scoreCriterion';
import addScoreCriterion from './modules/ControlCenter/show/contest/scoreCriterion/addScoreCriterion';
import editScoreCriterion from './modules/ControlCenter/show/contest/scoreCriterion/editScoreCriterion';
import editScoreCard from './modules/ControlCenter/show/contest/contestant/scoreCard/editScoreCard';
import addScoreCard from './modules/ControlCenter/show/contest/contestant/scoreCard/addScoreCard';
import editPerformer from './modules/ControlCenter/show/contest/contestant/performer/editPerformer';
import addPerformer from './modules/ControlCenter/show/contest/contestant/performer/addPerformer';
import * as Hubs from './data/signalr/hubs';

var Menu = React.createClass({
    render: function () {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <span className="navbar-brand">
                                Control Center
                            </span>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/shows">Shows</Link></li>
                            <li><Link to="/divisions">Divisions</Link></li>
                            <li><Link to="/organizations">Organizations</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                </nav>
                <div style={{margin: "20px"}}>{this.props.children}</div>
            </div>
        );
    }
});

function requireAuth(nextState, replaceState){
    if(!getToken()){
        replaceState({ nextPathname: nextState.location.pathname }, '/login');
    }
}

function getToken(){
    return sessionStorage.getItem("token");
}

 Hubs.hubConnection.start({ transport: ['webSockets'], jsonp: true })
    .done(function(){
        console.log("Connected");     

        render((
            <Router history={hashHistory}>
                <Route path="/">
                    <IndexRoute component={login} />
                    <Route onEnter={requireAuth} component={Menu}>
                        <Route path="/unauthorized" component={unauthorized} />
                        <Route path="/divisions" component={divisions} />
                        <Route path="/divisions/add" component={addDivision} />
                        <Route path="/division/:divisionId/edit" component={editDivision} />
                        <Route path="/organizations" component={organizations} />
                        <Route path="/organizations/add" component={addOrganization} />
                        <Route path="/organization/:organizationId/edit" component={editOrganization} />
                        <Route path="/shows" component={shows} />
                        <Route path="/shows/add" component={addShow} />
                        <Route path="/show/:showId" component={show} />
                        <Route path="/show/:showId/edit" component={editShow} />
                        <Route path="/show/:showId/contests/add" component={addContest} />
                        <Route path="/show/:showId/contest/:contestId" component={contest} />
                        <Route path="/show/:showId/contest/:contestId/edit" component={editContest} />
                        <Route path="/show/:showId/contest/:contestId/contestants/add" component={addContestant} />
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId" component={contestant} />
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId/edit" component={editContestant} />
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId/scorecards/add" component={addScoreCard} /> 
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId/scorecard/:scoreCardId/edit" component={editScoreCard} />
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId/performers/add" component={addPerformer} /> 
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId/performer/:performerId/edit" component={editPerformer} />                       
                        <Route path="/show/:showId/contest/:contestId/judges/add" component={addJudge} />
                        <Route path="/show/:showId/contest/:contestId/judge/:judgeId" component={judge} />
                        <Route path="/show/:showId/contest/:contestId/judge/:judgeId/edit" component={editJudge} />
                        <Route path="/show/:showId/contest/:contestId/scorecriteria/add" component={addScoreCriterion} />
                        <Route path="/show/:showId/contest/:contestId/scorecriterion/:scoreCriterionId" component={scoreCriterion} />
                        <Route path="/show/:showId/contest/:contestId/scorecriterion/:scoreCriterionId/edit" component={editScoreCriterion} />
                        <Route path="/about" component={about} />
                    </Route>
                </Route>
                </Router>
        ), document.getElementById('app'));
 });