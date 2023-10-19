const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const surveyRoutes = require('./routes/survey');

app.use(surveyRoutes);
app.get('*', function(req, res){
    res.render('notFound');
});
app.get('/about', (req, res) => {
    res.render('About',
        { pageTitle: 'About',
        from: 'about' });
});
app.get('/surveyResults', (req, res) => {
    res.render('surveyResults',
        { pageTitle: 'About',
        from: 'about' });
});
app.use((req, res) => {
    res.status(404).send('<h2>Request not found</h2>');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('<h2>Server Error</h2>');
});
const port = 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});