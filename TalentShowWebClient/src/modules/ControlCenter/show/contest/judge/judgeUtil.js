'use strict';

var getName = function (judge, user) {
    return user.FirstName + " " + user.LastName + " (" + judge.Id + ")" ;
};

var getDescription = function (user) {
    return user.Affiliation.Name;
};

export {getName, getDescription};