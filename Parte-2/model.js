let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;



let bookmark = mongoose.Schema({
    
    id: {type:String},
    titulo: {type:String},
    descripcion: {type:String},
    url: {type:String}
}
)


let Bookmarks = mongoose.model('bookmark', bookmark);

let BookmarksList = {
    update: function(id2, titulo2, descripcion2, url2){
        Bookmarks.findOneAndUpdate({id:id2},{titulo:titulo2, descripcion:descripcion2,url: url2}, {omitUndefined:true, new:true, useFindAndModify:false} ).then(nuevo=>{
            return nuevo;
        }).catch(error=>{
            return error;
        });
    }
}
module.exports = {
    BookmarksList
};