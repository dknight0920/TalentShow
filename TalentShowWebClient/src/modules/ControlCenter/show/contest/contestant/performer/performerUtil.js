'use strict';
var getName = function (performer) {
    var performerName = performer.Name;
    return performerName.FirstName + " " + performerName.LastName;
};

var getDescription = function (performer) {
    return "Division: " + performer.Division.Name + " Affiliation: " + performer.Affiliation.Name;
};

export {getName, getDescription};