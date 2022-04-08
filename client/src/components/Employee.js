import React from "react"
import { Button } from "react-bootstrap"
import "./Employee.css"

function Employee({ posts, loading }) {
  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <tr>
      <td>{posts.id}</td>
      <td>{posts.firstName}</td>
      <td>{posts.lastName}</td>
      <td>{posts.position}</td>
      <td>{posts.sickLeaveCredits}</td>
      <td>{posts.vacationLeaveCredits}</td>
      <td>{posts.hourlyRate}</td>
      <td>
        <div className='employee-buttons'>
          <Button variant='success'>Update</Button>{" "}
          <Button variant='warning'>Delete</Button>{" "}
        </div>
      </td>
    </tr>
  )
}

export default Employee
