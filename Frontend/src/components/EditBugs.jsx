import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBugs = () => {
  const [idDetail, setIdDetail] = useState({ id: "" });
  const [bugDetails, setBugDetails] = useState(null);
  const [bugList, setBugList] = useState([]);
  const bugFormData = {
    id: "",
    bugName: "",
    bugStatus: "",
    priority: "",
    assignee: "",
  };
  const [updateList, setUpdateList] = useState(bugFormData);

  const handleUpdateForm = (e) => {
    const { name, value } = e.target;
    setUpdateList({
      ...updateList,
      [name]: value,
    });
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    try {
      const response = await axios.put(
        "http://localhost:4000/api/updateBug",
        updateList
      );
      setUpdateList(bugFormData);
      console.log("Bugs : ", response);
    } catch (err) {
      console.error("Error ", err);
    }
    // Store the data or perform any other necessary actions here
    console.log("Bug Name:", updateList.bugName);
    console.log("Bug Status:", updateList.bugStatus);
    console.log("Bug Priority:", updateList.priority);
    console.log("Bug Assignee:", updateList.assignee);
  };

  async function getBugs() {
    try {
      const response = await axios.get("http://localhost:4000/api/bugs-home", {
        method: "GET",
      });
      setBugList(response.data.bugs);
    } catch (error) {
      console.error("Error fetching bugs: ", error);
    }
  }

  useEffect(() => {
    getBugs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdDetail({
      ...idDetail,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/findBugs",
        idDetail
      );
      console.log("Bugs : ", response);
      setBugDetails(response.data.bugs); // Set bug details when received
    } catch (err) {
      console.error("Error", err);
    }
  };

  useEffect(() => {
    const getBugsData = async () => {
      await handleFormSubmit();
    };
    getBugsData();
  }, []);

  return (
    <div className="editBugs">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-input">
          <label>Bug Id : </label>
          {/* <input type="text" name='id' value={idDetail.id} onChange={handleChange} /> */}
          <select name="id" value={bugList.id} onChange={handleChange}>
            {bugList.map((data) => (
              <option key={data.id} value={data.id}>
                {data.id}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Find</button>
      </form>

      {/* Display bug details based on the selected option */}
      {bugDetails && (
        <div>
          <h1>ID: {bugDetails.id}</h1>
          <h1>Bug Name: {bugDetails.bugName}</h1>
          <h1>Bug Status: {bugDetails.bugStatus}</h1>
          <h1>Tracker: {bugDetails.tracker}</h1>
          <h1>Priority: {bugDetails.priority}</h1>
          <h1>Assignee: {bugDetails.assignee}</h1>
        </div>
      )}

      <form onSubmit={handleUpdateFormSubmit} className="bugForm">
        <div className="form-input">
          <label>Bug Id : </label>
          <input
            type="text"
            name="id"
            value={bugList[0]?.id}
            onChange={handleUpdateForm}
          />
        </div>
        <div className="form-input">
          <label>Bug Name : </label>
          <input
            type="text"
            name="bugName"
            value={bugList[0]?.bugName}
            onChange={handleUpdateForm}
          />
        </div>
        <div className="form-input">
          <label>Bug Status : </label>
          <select
            name="bugStatus"
            value={bugList[0]?.bugStatus}
            onChange={handleUpdateForm}
          >
            <option value=""></option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Ready For Merge">Ready For Merge</option>
            <option value="New">New</option>
          </select>
        </div>
        <div className="form-input">
          <label>Priority : </label>
          <select
            name="priority"
            value={bugList[0]?.priority}
            onChange={handleUpdateForm}
          >
            <option value=""></option>
            <option value="Immediate">Immediate</option>
            <option value="Low">Low</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="form-input">
          <label>Assignee : </label>
          <select
            name="assignee"
            value={bugList[0]?.assignee}
            onChange={handleUpdateForm}
          >
            <option value=""></option>
            <option value="Murugesh">Murugesh</option>
            <option value="Niresh">Niresh</option>
            <option value="Sashi Kuamr">Sashi Kuamr</option>
            <option value="Rishi">Rishi</option>
            <option value="Saran Kumar">Saran Kumar</option>
          </select>
        </div>
        <div className="form-btn">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditBugs;
