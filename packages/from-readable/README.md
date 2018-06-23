# xstream-from-readable

Turns a Node.js Readable stream into an Xstream

By default it will listen for the `data`, `end`, and `error` events; and act accordingly.
You can change this passing an object to the second argument with the names of the events you want to listen on.
