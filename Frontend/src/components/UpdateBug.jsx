import React, { useState, useEffect } from 'react'
import axios from 'axios';


const UpdateBug = () => {

    const [getBugs, setGetBugs] = useState([]);
    const [findBugId, setFindBugId] = useState({
        id: ''
    })
    const [showUpdateBug, setShowUpdateBug] = useState([]);
    const [bugToUpdate, setBugToUpdate] = useState({
        id: showUpdateBug.id,
        bugName: showUpdateBug.bugName,
        bugStatus:showUpdateBug.bugStatus,
        priority: showUpdateBug.priority,
        assignee: showUpdateBug.assignee
    });

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


    const handleChangeFind = (e) => {
        const { name, value } = e.target
        setFindBugId({
            ...findBugId,
            [name]: value
        })
    }

    async function handleFindForm() {
        if (!findBugId.id) {
            alert("Bug Id doesn't exist ")
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/findBugs", findBugId);
            console.log(response);
            setShowUpdateBug([response.data.bugs])
        } catch (error) {
            console.log(error);
        }
    }


    const handleUpdateFormChange = (e) => {
        const { name, value } = e.target;
        
            // Update the bugToUpdate state with the new values
            setBugToUpdate({
                ...bugToUpdate,
                [name]: value
            });
        
    }


    // FUNCTION FOR UPADTE FORM
    async function handleUpdateFormSubmit() {
        if (!bugToUpdate) {
            alert("Bug Data doesn't exist ")
            return;
        }
        try {
            // Send a PUT request to update the bug data
            const response = await axios.put("http://localhost:3000/api/updateBug", bugToUpdate);
            console.log(response);
            setBugToUpdate(response.data)
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className='updateBug'>
            <form className='findForm' onSubmit={(e) => {
                e.preventDefault();
                handleFindForm();
            }}>
                <div className="inp-delete">
                    <label>Bug Id: </label>
                    <select name="id" value={findBugId.id} onChange={handleChangeFind}>
                        <option value="" style={{ color: 'grey' }}>Select Bug Id</option>
                        {getBugs.map((data) => (
                            <option key={data.id} value={data.id}>
                                {data.id}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Find</button>
            </form>


            {showUpdateBug.length > 0 ? (
                <div>
                    {showUpdateBug.map((data) => (
                        <form key={data.id} onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateFormSubmit();
                        }} className='bugForm'>
                            <div className="form-input">
                                <label>Bug Id : </label>
                                <input type="text" name='id' value={bugToUpdate.id} onChange={handleUpdateFormChange} />
                            </div>
                            <div className="form-input">
                                <label>Bug Name : </label>
                                <input type="text" name='bugName' value={data.bugName || bugToUpdate.bugName } onChange={handleUpdateFormChange} />
                            </div>
                            <div className="form-input">
                                <label >Bug Status : </label>
                                <select name="bugStatus" value={bugToUpdate.bugStatus } onChange={handleUpdateFormChange}>
                                    {showUpdateBug.map((data) => (
                                        <option key={data.id} value={data.bugStatus}>
                                            {data.bugStatus}
                                        </option>
                                    ))}
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                    <option value="Ready For Merge">Ready For Merge</option>
                                    <option value="New">New</option>
                                </select>
                            </div>
                            <div className="form-input">
                                <label >Priority : </label>
                                <select name="priority" value={bugToUpdate.priority } onChange={handleUpdateFormChange}>
                                    {showUpdateBug.map((data) => (
                                        <option key={data.id} value={data.priority}>
                                            {data.priority}
                                        </option>
                                    ))}
                                    <option value="Immediate">Immediate</option>
                                    <option value="Low">Low</option>
                                    <option value="High">High</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                            <div className="form-input">
                                <label >Assignee : </label>
                                <select name="assignee" value={bugToUpdate.assignee} onChange={handleUpdateFormChange}>
                                    {showUpdateBug.map((data) => (
                                        <option key={data.id} value={data.assignee}>
                                            {data.assignee}
                                        </option>
                                    ))}
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
                    ))}
                </div>
            ) : null}

            {bugToUpdate.length > 0 ? ( // Check if deletedBug has data
                <div>
                    {bugToUpdate.map((data) => (
                        <div key={data.id}>
                            <h1 style={{ color: 'red' }}>Bug Updated Successfully  ID: {data.id}</h1>
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
                        {showUpdateBug.map((data) => (
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

export default UpdateBug