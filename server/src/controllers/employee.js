const {saveEmployee, selectAll, checkEmployee, deleteById, updateById} = require('../utils/query')
const {mysqlPool, query} = require('../utils/connection')

const registEmployees = async(req,res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            firstName,
            lastName,
            position,
            sickLeaveCredits,
            vacationLeaveCredits,
            hourlyRate
        } = req.body;
        //to check if the employee has the same id
        const employee = await query(checkEmployee, [req.body.id], transaction)
        if(employee.length > 0){
            res.json(309)
        }else{
            //insert employee into the database
            const insert = await query(saveEmployee, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate],transaction)
            res.json({employee: req.body})
            
        }
    }catch(err){
        res.json(err.message);
    }
}

const listEmployees = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        //to list all employees
        const employee = await query(selectAll, [], transaction)
        res.json({employee})
    }catch{
        res.send({code:500, message:'error'})
    }
}

const deleteEmployeeById = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            id: inputId
        } = req.params
        //check if there is an employee with this id number
        
        const employee = await query(checkEmployee, [inputId], transaction)
        console.log(employee)
        if(employee.length > 0){
            const deleteEmployee = await query(deleteById, [inputId], transaction)
            res.json({employee})
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.json({code:500, message:'server Error'})
    }
}

const updateEmployee = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            id: inputId
        } = req.params
        const{
            firstName,
            lastName,
            position,
            sickLeaveCredits,
            vacationLeaveCredits,
            hourlyRate
        } = req.body;
        const employee = await query(checkEmployee, [inputId], transaction)
        if(employee.length > 0){
            const updateEmployee = await query(updateById, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate, inputId], transaction)
            res.send({employee: req.body})
        }else{
            res.send(404)
        }
    }catch{
        res.json({code:500, message:'server Error'})
    }
}

const getEmployeeById = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            id 
        } = req.params
        const employee = await query(checkEmployee, [id], transaction)
        if(employee.length > 0){
            res.json({employee: employee[0]})
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.json({code:501, message:'server Error'})
    }
}
module.exports = {
    registEmployees,
    listEmployees,
    deleteEmployeeById,
    updateEmployee,
    getEmployeeById
};