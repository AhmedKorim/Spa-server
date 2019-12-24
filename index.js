const Express = require( 'express' );
const path = require( 'path' );
const fs = require( 'fs' )
const expressStaticGzip = require( 'express-static-gzip' );
const app = Express()

// app.get( '*', ( req, res ) => {
//     const fileStream = fs.createReadStream( path.join( __dirname, '..', 'build', 'index.html' ) )
//     res.contentType( 'text/html' )
//     fileStream.pipe( res )
// } )
// app.use( Express.static( path.join( __dirname, '..', 'build' ) ) )
app.use( '/', expressStaticGzip( path.join( __dirname, '..', 'build' ), {
    enableBrotli: true,
    customCompressions: [ {
        encodingName: 'deflate',
        fileExtension: 'zz'
    } ],
    orderPreference: [ 'br' ]
} ) );
app.use( '*', ( req, res, next ) => {
    req.url = '/';
    return expressStaticGzip( path.join( __dirname, '..', 'build' ), {
        enableBrotli: true,
        customCompressions: [ {
            encodingName: 'deflate',
            fileExtension: 'zz'
        } ],
        orderPreference: [ 'br' ]
    } )( req, res, next );
} );
app.listen( 8055 )
