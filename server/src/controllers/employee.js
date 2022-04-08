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
        res.send('success')
        //to check if the employee has the same id
        const employee = await query(checkEmployee, [id], transaction)
        if(employee.length > 0){
           res.send({code:309, message:"Employee has the existing ID"})
        }else{
            const insert = await query(saveEmployee, [firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate], transaction)
        }
    }catch(err){
        res.json(err.message);
    }
}

const listEmployees = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const list = await query(selectAll, [], transaction)
        res.json(list)
    }catch(err){
        res.send({code:500, message:'erro'})
    }
}

module.exports = {
    registEmployees,
    listEmployees
};