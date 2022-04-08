import React, { useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

import "./Edit.css"

function Save() {
  const onClick = () => {
    Axios.post(
      `https://3305-xscold-hackathondhvsut-308klzbob9d.ws-us38.gitpod.io/api/management/employee`,
      {
        id: 12,
        firstName: "Vash",
        lastName: "Ramos",
        position: "Programmer",
        sickLeaveCredits: 3,
        vacationLeaveCredits: 3,
        hourlyRate: 1900,
      }
    )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='container'>
      <h1>Save</h1>
      <Form>
        <Form.Group className='mb-3' controlId='firstName'>
          <Form.Control type='text' id='firstName' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='lastName'>
          <Form.Control type='text' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='position'>
          <Form.Control type='text' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='sickLeaveCredits'>
          <Form.Control type='text' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='vacationLeaveCredits'>
          <Form.Control type='text' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='hourlyRate'>
          <Form.Control type='text' />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          onClick={() => {
            onClick()
          }}
        >
          Save
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

export default Save
