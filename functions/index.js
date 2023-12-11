
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const supabaseClient = require('@supabase/supabase-js')

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const express = require('express');

const app = express();
const supabaseUrl = 'https://fyafwhuuqdypucksxyuw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5YWZ3aHV1cWR5cHVja3N4eXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4ODkyNjcsImV4cCI6MjAxNzQ2NTI2N30.Du71SiFogASamKoVpdGC5EME-Xo56g0ePTU9GxNkv1I'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/coder/name', async (req, res) => {
    const { data, error } = await supabase
        .from('coder')
        .select();

    if (error) {
        console.log(error)
    } else if (data) {
        res.send({ name: data[0]['name'] })
    }
});

app.get('/coder/email', async (req, res) => {
    const { data, error } = await supabase
        .from('coder')
        .select();

    if (error) {
        console.log(error)
    } else if (data) {
        res.send({ email: data[0]['email'] })
    }
});


exports.api = functions.https.onRequest(app);