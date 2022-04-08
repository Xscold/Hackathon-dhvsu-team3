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
            res.sendStatus(404)
        }else{
            //insert employee into the database
            const insert = await query(saveEmployee, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate],transaction)
            res.send(200).json({employee:req.body})
        }
    }catch(err){
        res.send("error");
    }
}

const listEmployees = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        //to list all employees
        const employee = await query(selectAll, [], transaction)
        res.send(200).json({employee})
    }catch{
        res.send("error");
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
        //console.log(employee)
        if(employee.length > 0){
            const deleteEmployee = await query(deleteById, [inputId], transaction)
            res.send(200).json({employee:employee[0]})
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.send("error");
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
        console.log(req.body)
        const employee = await query(checkEmployee, [inputId], transaction)
        if(employee.length > 0){
            const updateEmployee = await query(updateById, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate, inputId], transaction)
            res.send(200).json({employee:req.body})
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.send("error");
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
            res.send(200).json({employee:employee[0]})
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.send("error");
    }
}
module.exports = {
    registEmployees,
    listEmployees,
    deleteEmployeeById,
    updateEmployee,
    getEmployeeById
};