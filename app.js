const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'public')));

// Import route
const surveyRoutes = require('./routes/survey');

// Use routes
app.use(surveyRoutes);

app.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About', from: 'about' });
});

// 404 handler - This should come after all other routes
app.use((req, res) => {
    res.status(404).send('<h2>Request not found</h2>');
});

// Error handling middleware - This should be the last middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h2>Server Error</h2>');
});

// Start the server
const port = 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});