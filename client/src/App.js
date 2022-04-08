import { Table } from "react-bootstrap"
import Employee from "./components/Employee"
import axios from "axios"
import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch Data
    const fetchEmployee = async () => {
      setLoading(true)
      const res = await axios.get(
        "https://3305-xscold-hackathondhvsut-emgtmtdcczy.ws-us38.gitpod.io/api/management/employee"
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
            <th>Actions</th>
          </tr>
        </thead>
        {posts?.length > 0 ? (
          <tbody>
            {posts.map((posts) => (
              <Employee key={posts.id} posts={posts} loading={loading} />
            ))}
          </tbody>
        ) : (
          <h2>No posts Found</h2>
        )}
      </Table>
    </div>
  )
}

export default App
