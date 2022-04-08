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
            return res.sendStatus(404)
        }else{
            //insert employee into the database
            const insert = await query(saveEmployee, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate],transaction)
            return res.sendStatus(200).json({employee:req.body})
        }
    }catch(err){
        return res.sendStatus(404);
    }
}

const listEmployees = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        //to list all employees
        const employee = await query(selectAll, [], transaction)
        return res.sendStatus(200).json({employee})
    }catch{
        return res.sendStatus(404);
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
        if(employee.length > 0){
            const deleteEmployee = await query(deleteById, [inputId], transaction)
            return res.sendStatus(200).json({employee:employee[0]})
        }else{
            return res.sendStatus(404)
        }
<<<<<<< HEAD
    }catch(err){
        res.send("error");
=======
    }catch{
        return res.sendStatus(404);
>>>>>>> b29ae06647727d829e5577d3799c7dc6ea618705
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
            return res.sendStatus(200).json({employee:req.body})
        }else{
            return res.sendStatus(404)
        }
    }catch(err){
<<<<<<< HEAD
        res.send("error");
=======
        return res.sendStatus(303);
>>>>>>> b29ae06647727d829e5577d3799c7dc6ea618705
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
            res.sendStatus(200).json({employee:employee[0]})
        }else{
            return res.sendStatus(404)
        }
<<<<<<< HEAD
    }catch(err){
        res.send("error");
=======
    }catch{
        return res.sendStatus(404);
>>>>>>> b29ae06647727d829e5577d3799c7dc6ea618705
    }
}
module.exports = {
    registEmployees,
    listEmployees,
    deleteEmployeeById,
    updateEmployee,
    getEmployeeById
};