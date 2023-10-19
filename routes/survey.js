const express = require('express');
const router = express.Router();
const path = require("path");
const { categories, questions, maximumPts, calculateScores } = require('../data/data.js');
router.get('/notFound', (req, res) => {
    console.log('Attempting to render About...');
    res.render('notFound', {
        pageTitle: 'survey',
        from: 'home',
        questions: questions
    });
});
router.get('/survey', (req, res) => {
    res.render('survey', {
        pageTitle: 'Personality Perfect',
        from: 'home',
        questions: questions
    });
});

router.post('/surveyResults', (req, res) => {
    const results = calculateScores(req.body);
    res.render('surveyResults', {
        pageTitle: 'Interest Survey',
        results: results,
        categories: Object.values(results),
        maximumPts: maximumPts
    });
});
router.get('/About', (req, res) => {
    res.render('About', {
        pageTitle: 'survey',
        from: 'home',
    });
});
module.exports = router;