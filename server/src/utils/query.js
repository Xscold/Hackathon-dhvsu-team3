

const saveEmployee = "INSERT INTO employee (firstName, lastName, position, sickLeaveCredits, vacationLeaveCredits, hourlyRate) VALUES(?,?,?,?,?,?)"

const selectAll = "SELECT * FROM employee"

const checkEmployee = "SELECT * FROM employee where id = ?"

const deleteById = "DELETE FROM employee where id = ?"

const updateById = "UPDATE employee SET firstName = ?, lastName = ?, position = ?, sickLeaveCredits = ? , vacationLeaveCredits= ?, hourlyRate = ? where id = ?"

const auditLogs = "INSERT INTO audits (id,timeInDate) VALUES(?,?)"

module.exports = {
    saveEmployee,
    selectAll,
    checkEmployee,
    deleteById,
    updateById,
    auditLogs
}