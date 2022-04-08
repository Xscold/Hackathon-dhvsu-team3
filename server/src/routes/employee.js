const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/employee');

router.get('/management/employee', userController.listEmployees)
router.post('/management/employee', userController.registEmployees)
router.delete('/management/employee/:id', userController.deleteEmployeeById)
router.put('/management/employee/:id', userController.updateEmployee)
router.get('/management/employee/:id', userController.getEmployeeById)


module.exports = router;