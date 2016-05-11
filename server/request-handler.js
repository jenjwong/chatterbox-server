/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/




var messages = [];

var requestHandler = function(req, res) {

if (req.url !== '/classes/messages' || req.url === undefined) {
  console.log(req.url)
  console.log('GOOOOTTT YOUUUUU')
  res.writeHead(404, {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10,
    'content-type': 'text/plain' // Seconds.
  });
  res.end(JSON.stringify({results: messages}));

}
  if (req.method == 'POST') {
    var objectId = 1;
    objectId++;
    var fullBody = '';

    req.on('data', function(chunk) {
      // append the current chunk of data to the fullBody variable
      fullBody += chunk.toString();
    });




    req.on('end', function() {
      messages.push(JSON.parse(fullBody));
      console.log(messages, 'these are messages')
      // request ended -> do something with the data
      var statusCode = 201;

      res.writeHead(201, {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10,
        'content-type': 'text/plain' // Seconds.
      });
      res.end(JSON.stringify({results: messages}));


      // parse the received body data


    });

  }


  if (req.method === 'GET') {

    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    var statusCode = 200;
    var headers = defaultCorsHeaders;

    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    headers['Content-Type'] = 'text/plain';

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    res.writeHead(statusCode, headers);

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.



    res.end(JSON.stringify({results: messages}));

  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'access-control-max-age': 10,
      'content-type': 'text/plain' // Seconds.
    });
    res.end(JSON.stringify({results: messages}));

  }
};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'content-type': 'text/plain' // Seconds.
};

module.exports.requestHandler = requestHandler;
