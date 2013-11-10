var deepPath =  function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

module.exports = function(mongooseModelTree,copiedData){

    var __excludeProtected = function(path,object){

        for (var property in object){

            var combinedPath =(path!=null && path!=undefined)? path+"."+property :property
            var mongooseField = deepPath(mongooseModelTree,combinedPath)

            if(!mongooseField){  // mongoose does allow writing any data non-related to objects in nested schemas. we don't
                delete object[property]
            }
            else if(object[property] instanceof Array){  //if array, do nested search for array

                //double check path
                var mongooseArraySchema =deepPath(mongooseModelTree,combinedPath);

                if(!(mongooseArraySchema instanceof Array)){
                    //nested array schema can be defined 2 ways - by [] or {items:[]}. lets check if it will work with items
                    mongooseArraySchema = deepPath(mongooseModelTree,combinedPath+".items");
                }
                if(!(mongooseArraySchema instanceof Array)){
                    //not valid schema, should delete
                    delete object[property];
                }
                else {
                    combinedPath +=".0"
                    for(var i =0;i<object[property].length;i++){
                        __excludeProtected(combinedPath,object[property][i])
                    }
                }

            }
            else if (mongooseField && mongooseField.protect){   //check and delete protected fields.
                 delete object[property]
            }
            else if (typeof object[property]=="object"){  //if object, do nested search
                __excludeProtected(combinedPath,object[property])
            }
            else{
                //test no action.do nothing. ccompletely nothing
            }
        }
    }
    __excludeProtected(null,copiedData);
    return copiedData;
}
