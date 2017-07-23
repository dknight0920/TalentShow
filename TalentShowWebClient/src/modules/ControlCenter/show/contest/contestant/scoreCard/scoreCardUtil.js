'use strict';
import React from 'react';

var getName = function (scoreCard) {
    var judgeId= scoreCard.Judge.Id;
    return "Score Card by " + judgeId;
};

var getDescription = function (scoreCard) {
    var description = [];
    var key = 0;
    if(scoreCard && scoreCard.ScorableCriteria && scoreCard.ScorableCriteria.length) {
        for (var i = 0; i < scoreCard.ScorableCriteria.length; i++) {
            var scorableCriterion = scoreCard.ScorableCriteria[i];
            if( i > 0) {
                description.push( (<hr key={key++}/>) );
            }
            description.push((
                <span key={key++}>
                    <b><i>{scorableCriterion.ScoreCriterion.CriterionDescription}</i></b>
                    <br />
                    <b>{"Comment"}</b>{": " + scorableCriterion.Comment}
                    <br />
                    <b>{"Score"}</b>{": " + scorableCriterion.Score}
                </span>
            ));
        }
    }
    description.push( (<hr key={key++} />) );
    description.push( (<span key={key++}><h4>Total Score: {scoreCard.TotalScore}</h4></span>) );
    return description;
};

export {getName, getDescription};