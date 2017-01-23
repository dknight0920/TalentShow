var getName = function (contestant) {
    var performerNames = "";

    for (var i = 0; i < contestant.Performers.length; i++) {
        var performerName = contestant.Performers[i].Name;
        if (i > 0) {
            performerNames += ", ";
        }
        performerNames += performerName.FirstName + " " + performerName.LastName;
    }
    return performerNames + " (" + contestant.Id + ")";
};

var getDescription = function (contestant) {
    return contestant.Performance.Description;
};

export {getName, getDescription};