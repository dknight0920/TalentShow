import React from 'react';
import { hashHistory } from 'react-router';

export function goToUnauthorized() {
    hashHistory.push('/unauthorized');
};

export function goToShows() {
    hashHistory.push('/shows');
};

export function goToAddShow() {
    hashHistory.push('/shows/add');
};

export function goToShow(showId) {
    hashHistory.push('/show/' + showId);
};

export function goToEditShow(showId) {
    hashHistory.push('/show/' + showId + '/edit');
};

export function goToAddContest(showId) {
    hashHistory.push('/show/' + showId + '/contests/add');
};

export function goToContest(showId, contestId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId);
};

export function goToEditContest(showId, contestId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/edit');
};

export function goToContestant(showId, contestId, contestantId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId);
};

export function goToAddJudge(showId, contestId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/judges/add');
};

export function goToJudge(showId, contestId, judgeId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/judge/' + judgeId);
};

export function goToEditJudge(showId, contestId, judgeId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/judge/' + judgeId + '/edit');
};

export function goToAddScoreCriterion(showId, contestId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/scorecriteria/add');
};

export function goToScorecard(showId, contestId, contestantId, scorecardId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/scorecard/' + scorecardId);
};
