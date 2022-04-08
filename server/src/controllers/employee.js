const {saveEmployee, selectAll, checkEmployee} = require('../utils/query')
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
        //res.send('success')
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
        res.json(list)
        //res.send({code:200, message:'success'})
    }catch(err){
        res.send({code:500, message:'erro'})
    }
}

const deleteById = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            id
        } = req.params

    }catch{
    
    }
}
module.exports = {
    registEmployees,
    listEmployees,
    deleteById
};