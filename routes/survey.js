const express = require('express');
const router = express.Router();
const path = require("path");
// Import your data
const { categories, questions, MAX_PTS } = require('../data/data.js');

router.get('/survey', (req, res) => {
    res.render('survey', {
        pageTitle: 'survey',
        from: 'home',
        questions: questions
    });
});

router.post('/surveyResults', (req, res) => {
    // Process answers and calculate results
    let results = {};
    let totalPoints = 0;

    for (let key in req.body) {
        totalPoints += parseInt(req.body[key]);
    }

    for (let category of categories) {
        let score = 0;
        // Assuming each category has related questions.
        // Adjust based on your data structure.
        for (let questionId of category.questions) {
            score += parseInt(req.body[questionId]);
        }
        results[category.name] = {
            score: score,
            desc: category.description,
            cat: category.name
        };
    }

    // Send results to 'surveyResults' view
    res.render('surveyResults', {
        pageTitle: 'Results',
        from: 'results',
        categories: Object.values(results),
        MAX_PTS: MAX_PTS
    });
});

module.exports = router;