const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/employee');

router.get('/management/employee/list', userController.listEmployees)
router.post('/management/employee', userController.registEmployees)

module.exports = router;