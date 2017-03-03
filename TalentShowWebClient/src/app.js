import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Link  } from 'react-router';
import about from './modules/about';
import login from './modules/login';
import judges from './modules/judges';
import unauthorized from './common/unauthorizedUserPageContent';
import shows from './modules/ControlCenter/shows';
import show from './modules/ControlCenter/show/show';
import addShow from './modules/ControlCenter/show/addShow';
import editShow from './modules/ControlCenter/show/editShow';
import contest from './modules/ControlCenter/show/contest/contest';
import addContest from './modules/ControlCenter/show/contest/addContest';
import contestant from './modules/ControlCenter/show/contest/contestant/contestant';
import scoreCard from './modules/ControlCenter/show/contest/contestant/scoreCard/scoreCard';

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
                            <li><Link to="/judges">Judges</Link></li>
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

 hubConnection.start({ transport: ['webSockets'], jsonp: true })
    .done(function(){
        console.log("Connected");     

        render((
            <Router history={hashHistory}>
                <Route path="/">
                    <IndexRoute component={login} />
                    <Route onEnter={requireAuth} component={Menu}>
                        <Route path="/unauthorized" component={unauthorized} />
                        <Route path="/shows" component={shows} />
                        <Route path="/shows/add" component={addShow} />
                        <Route path="/show/:showId" component={show} />
                        <Route path="/show/:showId/edit" component={editShow} />
                        <Route path="/show/:showId/contests/add" component={addContest} />
                        <Route path="/show/:showId/contest/:contestId" component={contest} />
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId" component={contestant} />
                        <Route path="/show/:showId/contest/:contestId/contestant/:contestantId/scorecard/:scoreCardId" component={scoreCard} />
                        <Route path="/about" component={about} />
                        <Route path="/judges" component={judges} />
                    </Route>
                </Route>
                </Router>
        ), document.getElementById('app'));
 });