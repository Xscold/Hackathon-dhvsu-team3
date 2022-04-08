const {saveEmployee, selectAll, checkEmployee} = require('../utils/query')
const {mysqlPool, query} = require('../utils/connection')

const registerUser = async(req,res) => {
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
        const employee = await query(checkEmployee, [id], transaction)
        if(employee.length > 0){
           res.send({code:309, message:"Employee has the existing ID"})
        }
    }catch(err){
        res.json(err.message);
    }
}

const listEmployees = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const list = await query(selectAll, [], transaction)
    }catch(err){

    }
}

module.exports = {
    registerUser,
    listEmployees
};