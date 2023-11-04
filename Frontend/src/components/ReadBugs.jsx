import React, { useEffect, useState } from 'react'
import axios from 'axios';



const ReadBugs = () => {
  const [getBugs, setGetBugs] = useState([]);

  // GET DATA FROM DATABASE
  async function handleGetAllBugs() {
    try {
      const response = await axios.get("http://localhost:3000/api/bugs-home", {
        method: "GET"
      })
      setGetBugs(response.data.bugs);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await handleGetAllBugs();
    };
    fetchData();

  }, []);

  return (
    <div className='readBugs'>
      <div className="table-container">
        <table className="bug-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Bug Name</th>
              <th>Bug Status</th>
              <th>Tracker</th>
              <th>Priority</th>
              <th>Assignee</th>
            </tr>
          </thead>
          <tbody>
            {getBugs.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.bugName}</td>
                <td>{data.bugStatus}</td>
                <td>{data.tracker}</td>
                <td>{data.priority}</td>
                <td>{data.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReadBugs