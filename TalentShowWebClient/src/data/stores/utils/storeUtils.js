import Clone from 'clone';

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

var pushItem = function(item, items, callback){
    var clonedItems = Clone(items);

    var replacedExisting = false;
    for (var i = 0; i < clonedItems.length; i++){
         if(clonedItems[i].Id == item.Id){
            clonedItems[i] = item;
            replacedExisting = true;
            break;
        }
    }

    if (!replacedExisting){
        clonedItems.push(item);
    }

    callback(clonedItems);
};

var removeItem = function(id, items, callback){
    var clonedItems = Clone(items);
    var results = [];

    for (var i = 0; i < clonedItems.length; i++){
         if(clonedItems[i].Id !== id){
            results.push(clonedItems[i]);
        }
    }

    callback(results);
};

export {get, pushItem, removeItem};