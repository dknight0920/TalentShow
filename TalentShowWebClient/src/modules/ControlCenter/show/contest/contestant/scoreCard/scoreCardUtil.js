import React from 'react';

var getName = function (scoreCard) {
    var judgeName = scoreCard.Judge.Name;
    return "Score card submitted by " + judgeName.FirstName + " " + judgeName.LastName;
};

var getDescription = function (scoreCard) {
    var description = "";
    if(scoreCard && scoreCard.ScorableCriteria && scoreCard.ScorableCriteria.length) {
        for (var i = 0; i < scoreCard.ScorableCriteria.length; i++) {
            var scorableCriterion = scoreCard.ScorableCriteria[i];
            if( i > 0) {
                description += "  ";
            }
            description += (i + 1) + ". " + scorableCriterion.ScoreCriterion.CriterionDescription;
        }
    }
    return description;
};

export {getName, getDescription};