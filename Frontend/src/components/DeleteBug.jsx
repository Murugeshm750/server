import axios from "axios";
import React, { useEffect, useState } from "react";

const DeleteBug = () => {
  const [getBugs, setGetBugs] = useState([]);
  const [deletedBug, setDeletedBug] = useState([]);
  const [deleteBugId, setDeleteBugId] = useState({
    id: "",
  });

  // GET DATA FROM DATABASE
  async function handleGetAllBugs() {
    try {
      const response = await axios.get("http://localhost:4000/api/bugs-home", {
        method: "GET",
      });
      setGetBugs(response.data.bugs);
    } catch (error) {
      console.log(error);
    }
  }

  // HANDLE THE INPUT DATA AND SET TO USESTATE
  const handleChangeDelete = (e) => {
    const { name, value } = e.target;
    setDeleteBugId({
      ...deleteBugId,
      [name]: value,
    });
  };
  // FUNCTION FOR DELETE
  async function handleDeleteForm() {
    if (!deleteBugId.id) {
      alert("Bug ID doesn't exist");
      return;
    }

    try {
      const response = await axios.delete(
        "http://localhost:4000/api/deleteBugs",
        {
          data: deleteBugId, // Pass the deleteBugId as the data to be deleted
        }
      );
      console.log(response);
      setDeletedBug([response.data]);
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
    <div className="DeleteBug">
      <form
        className="deleteForm"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleDeleteForm();
        }}
      >
        <div className="inp-delete">
          <label>Bug Id: </label>
          <select
            name="id"
            value={deleteBugId.id}
            onChange={handleChangeDelete}
          >
            <option value="" style={{ color: "grey" }}>
              Select Bug Id
            </option>
            {getBugs.map((data) => (
              <option key={data.id} value={data.id}>
                {data.id}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Delete</button>
      </form>
      {deletedBug.length > 0 ? ( // Check if deletedBug has data
        <div>
          {deletedBug.map((data) => (
            <div key={data.id}>
              <h1 style={{ color: "red" }}>
                Bug Deleted Successfully ID: {data.id}
              </h1>
              {/* ID: {data.id}
              <h1>Bug Name: {data.bugName}</h1>
              <h1>Bug Status: {data.bugStatus}</h1>
              <h1>Tracker: {data.tracker}</h1>
              <h1>Priority: {data.priority}</h1>
              <h1>Assignee: {data.assignee}</h1> */}
            </div>
          ))}
        </div>
      ) : null}

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
  );
};

export default DeleteBug;
