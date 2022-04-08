const {mysqlPool, query} = require('../utils/connection')
const {saveEmployee, selectAll, checkEmployee, deleteById, updateById} = require('../utils/query')
const moment = require('moment')


const salary = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
        startDate: inputStartDate, 
        endDate: inputEndDate,
    } = req.body;
        //compute milliseconds to day to compute for salary
        let totalWorkDays =  moment(inputEndDate) - moment(inputStartDate);
        // to check if end date is earlier than start date
        if(totalWorkDays < 0 ) return res.sendStatus(400)
        let duration = moment.duration(totalWorkDays, 'milliseconds')
        let days = duration.asDays();
        let totalWorkHours = days * 8;
        const{
            id
        } = req.params
        const employee = await query(checkEmployee, [id], transaction)
        if(employee.length > 0){
            const{
                id,
                firstName, 
                lastName,
                position,
                sickLeaveCredits,
                vacationLeaveCredits, 
                hourlyRate
            } = employee[0]
            res.json({salary: hourlyRate * totalWorkHours})
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.json('error something')
    }
}

const userTimeIn = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            timeInDate,
        } = req.body
        const { 
            id
        } = req.params
        let timeNow = moment().format('MM/DD/YYYY');
        res.json(timeNow)
    }catch{
        res.json('error something')
    }
}

module.exports = {
    salary,
    userTimeIn
}
