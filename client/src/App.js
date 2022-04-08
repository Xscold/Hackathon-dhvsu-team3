import { Table } from "react-bootstrap"
import Employee from "./components/Employee"
import axios from "axios"
import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true)
      const res = await axios.get(
        "https://3305-xscold-hackathondhvsut-snq9y95tirh.ws-us38.gitpod.ioapi/management/employee"
      )
      setPosts(res.data)
      setLoading(false)
    }

    fetchEmployee()
  }, [])

  console.log(posts)

  return (
    <div className='App'>
      <h1>Employee Management</h1>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Sick Leave Credits</th>
            <th>Vacation Leave Credits</th>
            <th>Hourly Rate</th>
          </tr>
        </thead>
        <tbody>
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
        </tbody>
      </Table>
    </div>
  )
}

export default App
