var get = function(id, items){
    var returnItem = null;

    for (var i = 0; i < items.length; i++){
        var item =items[i];
        if(item.Id == id){
            returnItem = item;
            break;
        }
    }

    return returnItem;
};

var pushItem = function(item, items){
     var replacedExisting = false;
     for (var i = 0; i < items.length; i++){
         var _item = items[i];
         if(_item.Id === item.Id){
             _item = item;
             replacedExisting = true;
             break;
         }
     }
     if (!replacedExisting){
         items.push(item);
     }
};

export {get, pushItem};