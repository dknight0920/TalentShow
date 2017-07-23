'use strict';
var getName = function (contestant) {
    var performerNames = "";

    for (var i = 0; i < contestant.Performers.length; i++) {
        var performerName = contestant.Performers[i].Name;
        if (i > 0) {
            performerNames += ", ";
        }
        performerNames += performerName.FirstName + " " + performerName.LastName;
    }

    var score = "";

    if(contestant.Performance.Duration > 0){
        score = " - Total Score: " +  contestant.TotalScore;
    }

    return performerNames + " (" + contestant.Id + ")" + score;
};

var getDescription = function (contestant) {
    return contestant.Performance.Description;
};

var getPerformanceDurationInSeconds = function (contestant) {
    return contestant.Performance.Duration / 10000000;
};

export {getName, getDescription, getPerformanceDurationInSeconds};