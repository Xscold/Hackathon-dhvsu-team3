const {saveEmployee, selectAll, checkEmployee, deleteById} = require('../utils/query')
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
           res.send({code:309, message:"Employee has the existing ID"})
        }else{
            //insert employee into the database
            const insert = await query(saveEmployee, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate], transaction)
            res.send({code:200, message:"Success"})
        }
    }catch(err){
        res.json(err.message);
    }
}

const listEmployees = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        //to list all employees
        const list = await query(selectAll, [], transaction)
        //res.json(list)
        res.send({code:200})
    }catch{
        res.send({code:500, message:'erro'})
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
            res.json({code:200, message:"successfully Deelete"})
        }else{
            res.json({code:404, message:'employee not found'})
        }
    }catch{
        res.json({code:500, message:'server Error'})
    }
}

const updateEmployee = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{

    }catch{

    }
}
module.exports = {
    registEmployees,
    listEmployees,
    deleteEmployeeById
};