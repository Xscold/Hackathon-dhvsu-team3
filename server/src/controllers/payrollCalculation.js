const {mysqlPool, query} = require('../utils/connection')
const {checkEmployee, auditLogs} = require('../utils/query')
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
        let timeNow = moment().format('MM/DD/YYYY HH:mm')
        if(timeInDate < timeNow) return res.sendStatus(400)
        //console.log(timeNow)
        const employee = await query(checkEmployee, [id], transaction)
        if(employee.length > 0){
            const insertIntoAudits = await query(auditLogs, [id,timeInDate], transaction)
            // transaction.commit()
            // transaction.release()
            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.json('error something')
    }
}

const userTimeOut = async(req, res) => {
    const transaction = await mysqlPool.getConnection();
    try{
        const{
            timeOutDate,
        } = req.body
        const { 
            id
        } = req.params
        let timeNow = moment().format('MM/DD/YYYY HH:mm:ss')
        if (timeOutDate > timeNow) return res.sendStatus(400)
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
            const insertIntoAudits = await query(auditLogs, [id,timeOutDate], transaction)
            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
    }catch{
        res.json('error something')
    }
}


module.exports = {
    salary,
    userTimeIn,
    userTimeOut
}
