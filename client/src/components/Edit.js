import React, { useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

import "./Edit.css"

function Edit() {
  const [newFirstName, setNewFirstName] = useState("")
  const [newLastName, setNewLastName] = useState("")
  const [newPosition, setNewPosition] = useState("")
  const [newSickLeaveCredits, setNewSickLeaveCredits] = useState("")
  const [newVacationLeaveCredits, setNewVactionLeaveCredits] = useState("")
  const [newHourlyRate, setNewHourlyRate] = useState("")

  let userId = localStorage.getItem("id")
  let firstName = localStorage.getItem("firstName")
  let lastName = localStorage.getItem("lastName")
  let position = localStorage.getItem("position")
  let sickLeaveCredits = localStorage.getItem("sickLeaveCredits")
  let vacationLeaveCredits = localStorage.getItem("vacationLeaveCredits")
  let hourlyRate = localStorage.getItem("hourlyRate")

  const onClickUpdate = (id) => {
    let PATH = `https://3305-xscold-hackathondhvsut-308klzbob9d.ws-us38.gitpod.io/api/management/employee/${id}`
    Axios.put(PATH, {
      firstName: newFirstName,
      lastName: newLastName,
      position: newPosition,
      sickLeaveCredits: newSickLeaveCredits,
      vacationLeaveCredits: newVacationLeaveCredits,
      hourlyRate: newHourlyRate,
    })

    console.log(PATH)
  }

  const onClickBack = () => {
    localStorage.removeItem("id")
    localStorage.removeItem("firstName")
    localStorage.removeItem("lastName")
    localStorage.removeItem("position")
    localStorage.removeItem("sickLeaveCredits")
    localStorage.removeItem("vacationLeaveCredits")
    localStorage.removeItem("hourlyRate")
  }

  const setInputValue = {
    newFirstName: setNewFirstName,
    newLastName: setNewLastName,
    newPosition: setNewPosition,
    newSickLeaveCredits: setNewSickLeaveCredits,
    newVacationLeaveCredits: setNewVactionLeaveCredits,
    newHourlyRate: setNewHourlyRate,
  }

  const onInputChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setInputValue[name](value)
  }

  return (
    <div className='container'>
      <h1>Edit</h1>
      <Form>
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Control
            type='text'
            placeholder={firstName}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Control
            type='text'
            placeholder={lastName}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='position'>
          <Form.Control
            type='text'
            placeholder={position}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='sickLeaveCredits'>
          <Form.Control
            type='text'
            placeholder={sickLeaveCredits}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='vacationLeaveCredits'>
          <Form.Control
            type='text'
            placeholder={vacationLeaveCredits}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='hourlyRate'>
          <Form.Control
            type='text'
            placeholder={hourlyRate}
            onChange={(e) => onInputChange(e)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' onClick={onClickUpdate(userId)}>
          Update
        </Button>
        <Link to='/'>
          <Button variant='warning' type='submit'>
            Back
          </Button>
        </Link>
      </Form>
    </div>
  )
}

export default Edit
