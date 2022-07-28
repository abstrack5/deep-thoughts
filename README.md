```
#install concurrently library as a dependency for development environment only

npm install -D concurrently

We can use the concurrently package to run multiple processes, or servers, from a single command line interface.
```


```
"scripts": {
  "start": "node server/server.js",
  "develop": "concurrently \"cd server && npm run watch\" \"cd client && npm start\"",
  "install": "cd server && npm i && cd ../client && npm i",
  "seed": "cd server && npm run seed"
}
```


```
We just added two important pieces of code(server server.js) that will only come into effect when we go into production. 
First, we check to see if the Node environment is in production. If it is, we instruct the Express.js server to serve any 
files in the React application's build directory in the client folder. We don't have a build folder yet—because remember, that's for production only!


// server up static assets
  if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  app.get ('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  })


The next set of functionality we created was a wildcard GET route for the server. In other words, if we make a GET request 
to any location on the server that doesn't have an explicit route defined, respond with the production-ready React front-end code.

We can't necessarily see or test this at the moment, because we aren't in production, but it will set us up for later when we deploy to Heroku.


npm run build (once in production)
npm run develop (runs both servers)

Notice the 0's and 1's being printed alongside the command-line output? That's concurrently's way of indicating which process is doing what. 
The process labeled with a 0 will be the server output, and the process labeled with a 1 will be the client output. Keep this in mind as you develop. 
It's easy to lose track when we have so much going on.
```


```
Set proxy in main package.json of client to 

"proxy": "http://localhost:3001",
```


```
Express backend catch all

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, './public/404.html'));
});
```

```
An Express.js route with a parameter would look like the following code:

app.get('/api/animals/:id', (req, res) => {
  console.log(req.params.id);
});
In this example, :id is the parameter, meaning requests to /api/animals/1 or /api/animals/100 would fall under the same route.
```


```
What's the term used for executing a function that scopes data to a new function and returns it to run at a later time?

A closure.
```


```
With GraphQL, there's even a way to use the same exact front-end query to request less information, 
but it's advanced technique. Once you feel more comfortable with GraphQL and Apollo, 
look up how to use something called "Directives"!
```

```
Navigate from react-router-dom

This component, Redirect, will allow us to redirect the user to another route within the application. Think of it like how we've used location.replace() in the past, but it leverages React Router's ability to not reload the browser!
```

```
We use the jsonwebtoken library server-side to sign or validate a token.
```

```
When the useMutation() Hook executes, does it make a request to the server?
  No, the useMutation() Hook is a function to set up the eventual mutation request that will be run, and returns a new function to execute it.

  the useMutation() Hook simply returns a function that we can use to eventually execute the mutation. If we need to do it immediately, we can implement it with the useEffect() Hook.
```

```
In the update() function (client/components/ThoughtForm), addThought represents the new thought that was just created. Using the cache object, we can read what's currently saved in the QUERY_THOUGHTS cache and then update it with writeQuery() to include the new thought object.

```