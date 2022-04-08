const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/employee');

router.get('/management/employee', userController.listEmployees)

module.exports = router;