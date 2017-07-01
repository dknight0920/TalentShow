'use strict';
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

export function goToAddContestant(showId, contestId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestants/add');
};

export function goToContestant(showId, contestId, contestantId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId);
};

export function goToEditContestant(showId, contestId, contestantId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/edit');
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

export function goToScoreCriterion(showId, contestId, scoreCriterionId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/scorecriterion/' + scoreCriterionId);
};

export function goToEditScoreCriterion(showId, contestId, scoreCriterionId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/scorecriterion/' + scoreCriterionId + '/edit');
};

export function goToAddScoreCard(showId, contestId, contestantId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/scorecards/add');
};

export function goToScoreCard(showId, contestId, contestantId, scorecardId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/scorecard/' + scorecardId);
};

export function goToAddPerformer(showId, contestId, contestantId) {
    hashHistory.push('/show/' + showId + '/contest/' + contestId + '/contestant/' + contestantId + '/performers/add');
};