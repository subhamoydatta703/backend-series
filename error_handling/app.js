// Import express framework
const express = require("express");

// Create an express application
const app = express();

// Import our custom error class
// This class lets us attach HTTP status codes to errors
const ExpressError = require("./ExpressError");

// NORMAL MIDDLEWARE

// Example middleware that runs BEFORE the /random route
const beforeRandom = (req, res, next) => {
  console.log("This runs before random");
  next(); // pass control to the next middleware / route
};

// ROUTES

// Home route
app.get("/", (req, res) => {
  res.send("Main route");
});

// Random route with middleware
app.get("/random", beforeRandom, (req, res) => {
  res.send("Random route");
});

// Route that intentionally causes an error
// (abcd is not defined → ReferenceError)
app.get("/err", (req, res) => {
  abcd == cabd;
});

// 404 HANDLER (for unknown routes)

// This runs ONLY if no route above matched
// If a matching route is found → that route runs
// If no route matches → this middleware runs
app.use((req, res, next) => {
  // Create a custom 404 error and pass it forward
  next(new ExpressError(404, "Page Not Found"));
});

// GLOBAL ERROR-HANDLING MIDDLEWARE

// This middleware runs whenever next(err) is called
// OR when a runtime error occurs in a route
app.use((err, req, res, next) => {
  // If the error has a status (from ExpressError), use it
  // Otherwise default to 500 (Internal Server Error)
  const status = err.status || 500;

  // Use the error message if available
  // Otherwise use a safe fallback message
  const message = err.message || "Internal Server Error";

  // Send the response to the client
  // This ENDS the request–response cycle
  res.status(status).send(message);
});


app.listen(8080, () => {
  console.log("Server running on port 8080");
});
