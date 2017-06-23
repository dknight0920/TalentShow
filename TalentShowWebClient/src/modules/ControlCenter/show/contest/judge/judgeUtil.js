'use strict';
var getName = function (judge) {
    return judge.Name.FirstName + " " + judge.Name.LastName + " (" + judge.Id + ")" ;
};

var getDescription = function (judge) {
    return judge.Affiliation.Name;
};

export {getName, getDescription};