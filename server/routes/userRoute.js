const express = require('express'); 
const { Sign } = require('../controllers/userController');
const router = express.Router(); 



router.post('/sign', Sign); 
router.get('/', (req, res) => {
    res.json({ status: 200, message: "Welcome to API Homepage ",});

});

module.exports = router; 