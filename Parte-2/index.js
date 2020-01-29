let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let {BookmarksList} = require('./model');

let app = express();

let server;

app.put('/api/bookmarks/:id', jsonParser, (req, res)=>{
	let id1 = req.params.id;
	let id = req.body.id;
	let titulo = req.body.titulo;
	let descripcion = req.body.descripcion;
	let url = req.body.url;
if(id){
	if(id==id1){
	
		if(titulo || descripcion || url){
			console.log(id);
			let nuevo = BookmarksList.update(id, titulo, descripcion, url)
			console.log(nuevo)
			return res.status(202).json(nuevo);
			
		}else{
			res.statusMessage = 'Elementos invalidos';
			return res.status(406).send();
		}
		
	}else{
		res.statusMessage = 'IDs no coinciden'
		return res.status(409).send();
	}}else{
		res.statusMessage = 'ID faltante'
		return res.status(406).send();
	}
})

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}