import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // HttpStatus to use code names:
  var HttpStatus = require('http-status-codes');
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Endpoint implemented based on instructions located after code block
  app.get("/filteredimage", async ( req: express.Request, res: express.Response ) => {
    // Retrieve the image_url query param from the request 
    let image_url = req.query.image_url;

    //Ensure that there is a value given for the image url
    if (!image_url) {
      return res.status(HttpStatus.BAD_REQUEST).send({message: 'A valid URL to an image needs to be provided'});
    }

    // Call filterImageFromURL and receive the absolute path back
    const imageAbsolutePath = await filterImageFromURL(image_url);
    // Put the absolute path into an array, this will be used to delete later
    let absolutePaths: string[] = [imageAbsolutePath];

    // Return an OK status code, the filtered image, and delete the 
    //   temp image from the server by calling deleteLocalFiles
    res.status(HttpStatus.OK).sendFile(imageAbsolutePath, () => {
      deleteLocalFiles(absolutePaths);
    });

  });
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: express.Request, res: express.Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();