module.exports = function(initialObject){

    var newObject = {}
    var copy = function(obj1,obj2){
        for (var key in obj1){
            obj2[key] = obj1[key]
            if (typeof obj1[key]=='object'){
                copy(obj1[key],obj2[key])
            }
        }
    }
    copy(initialObject,newObject)
    return newObject

}
