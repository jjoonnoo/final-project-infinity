const express = require('express');
const router = express.Router();

router.get('/chatbot', (req, res) => {
    res.render('chatbot', { layout: false });
});

module.exports = router;
