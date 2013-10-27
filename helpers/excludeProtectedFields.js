var deepPath =  function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

module.exports = function(mongooseModelTree,copiedData){
    console.log("mongoose nested path name child",mongooseModelTree['nested']['child'])
    console.log("mongoose nested path",mongooseModelTree['verified'])
    var __excludeProtected = function(path,object){

        for (var property in object){

            var combinedPath =(path!=null && path!=undefined)? path+"."+property :property
            console.log("path:",combinedPath)
            var mongooseField = deepPath(mongooseModelTree,combinedPath)
            if (mongooseField && mongooseField.protect){   //check and delete.
                 console.log("deleting property:",property)
                 delete object[property]
            }
            else if (typeof object[property]=="object"){  //if object, do nested search
                console.log("nested path",property)
                __excludeProtected(combinedPath,object[property])
            }
            else if(typeof object[property]=="array" || typeof object[property].items=="array"){  //if array, do nested search for array
                 //todo: array protected
            }
            else if(!mongooseField){  // mongoose does allow writing any data non-related to schema in nested objects. we don't
                 console.log("no mongoose field at path:",combinedPath)
                 delete object[property]
            }
            else{
                console.log("no action for:",combinedPath)
            }
        }
    }
    __excludeProtected(null,copiedData);
    return copiedData;
}
