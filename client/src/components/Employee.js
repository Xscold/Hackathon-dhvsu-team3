import React from "react"
import { Button } from "react-bootstrap"
import "./Employee.css"
import Edit from "./Edit"

import { Link } from "react-router-dom"
import Axios from "axios"

function Employee({ posts, loading }) {
  if (loading) {
    return <h2>Loading...</h2>
  }

  const onClickDelete = (id) => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const deleteQuery = async (id) => {
      Axios.delete(
        `https://3305-xscold-hackathondhvsut-308klzbob9d.ws-us38.gitpod.io/api/management/employee/${id}`
      )

      await delay(500)
      window.location.reload()
    }

    deleteQuery(id)
  }

  const onClickUpdate = () => {
    localStorage.setItem("id", posts.id)
    localStorage.setItem("firstName", posts.firstName)
    localStorage.setItem("lastName", posts.lastName)
    localStorage.setItem("position", posts.position)
    localStorage.setItem("sickLeaveCredits", posts.sickLeaveCredits)
    localStorage.setItem("vacationLeaveCredits", posts.vacationLeaveCredits)
    localStorage.setItem("hourlyRate", posts.hourlyRate)

    // window.location.href = "http://localhost:3000/edit"
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
          <Link to='/edit'>
            <Button variant='success' onClick={onClickUpdate()}>
              Update
            </Button>
          </Link>
          <Button
            variant='warning'
            onClick={() => {
              onClickDelete(posts.id)
            }}
          >
            Delete
          </Button>{" "}
        </div>
      </td>
    </tr>
  )
}

export default Employee
