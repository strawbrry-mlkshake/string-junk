require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

// Initialize express application
const app = express();

// Use body-parser middleware to parse JSON input
app.use(bodyParser.json());

// Define POST endpoint '/reverse'
app.post("/reverse", (req, res) => {
  // Get the input string from the request body
  const inputString = req.body.input;

  // Reverse the input string
  const reversedString = inputString.split("").reverse().join("");

  // Send the reversed string as the response
  res.send({ reversed: reversedString });
});

app.get("/generate", (req, res) => {
  const length = parseInt(req.query.length as string);

  // Generate a random string
  const randomString = crypto
    .randomBytes(length)
    .toString("hex")
    .substring(0, length);

  // Send the random string as the response
  res.send({ string: randomString });
});

app.get("/generateAndReverse", (req, res) => {
  const length = parseInt(req.query.length as string);

  // Generate a random string
  const randomString = crypto
    .randomBytes(length)
    .toString("hex")
    .substring(0, length);

  // Reverse the string
  const reversedString = randomString.split("").reverse().join("");

  // Send the original and reversed strings as the response
  res.send({ original: randomString, reversed: reversedString });
});

const port = process.env.PORT || 3000;

// Start the server
if (process.env.DEVELOPMENT === "true") {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
