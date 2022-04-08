

const saveEmployee = "INSERT INTO employee (firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate) VALUES(?,?,?,?,?,?)"

const selectAll = "SELECT * FROM employee"

const checkEmployee = "SELECT * FROM employee "

module.exports = {
    saveEmployee,
    selectAll,
    checkEmployee
}