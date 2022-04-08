const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/employee');

router.get('/management/employee', userController.listEmployees)
router.post('/management/employee', userController.registEmployees)

module.exports = router;