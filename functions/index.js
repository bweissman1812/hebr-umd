
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const express = require('express');

const app = express();

app.get('/coder/name', (req, res) => {
  res.status(200).send({name: 'Benjamin Weissman'});
});

app.get('/coder/email', (req, res) => {
    res.status(200).send({email: 'bweissman1812@gmail.com'});
  });

exports.api = functions.https.onRequest(app);