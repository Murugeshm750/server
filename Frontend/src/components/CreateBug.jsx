import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CreateBug = () => {

    const bugFormData = {
        bugName: '',
        bugStatus: '',
        priority: '',
        assignee: ''
      };

    const [list, setList] = useState(bugFormData)

    // This is handleChange form data
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setList({
            ...list, [name]: value,
        });
    }

    // Create a function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        try {
            const response = await axios.post('http://localhost:3000/api/createBugs', list);
            setList(bugFormData);
            console.log("Bugs : ", response);
        } catch (err) {
            console.error('Error ', err)

        }
        // Store the data or perform any other necessary actions here
        console.log('Bug Name:', list.bugName);
        console.log('Bug Status:', list.bugStatus);
        console.log('Bug Priority:', list.priority);
        console.log('Bug Assignee:', list.assignee);


    };

    return (
        <div className='ceateBug'>
            <form onSubmit={handleFormSubmit} className='bugForm'>
                <div className="form-input">
                    <label>Bug Name : </label>
                    <input type="text" name='bugName' required value={list.bugName} onChange={handleChange} />
                </div>
                <div className="form-input">
                    <label >Bug Status : </label>
                    <select name="bugStatus" value={list.bugStatus} onChange={handleChange}>
                        <option value=""></option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Ready For Merge">Ready For Merge</option>
                        <option value="New">New</option>
                    </select>
                </div>
                <div className="form-input">
                    <label >Priority : </label>
                    <select name="priority" value={list.priority} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Immediate">Immediate</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>
                <div className="form-input">
                    <label >Assignee : </label>
                    <select name="assignee" value={list.assignee} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Murugesh">Murugesh</option>
                        <option value="Niresh">Niresh</option>
                        <option value="Sashi Kuamr">Sashi Kuamr</option>
                        <option value="Rishi">Rishi</option>
                        <option value="Saran Kumar">Saran Kumar</option>
                    </select>
                </div>
                <div className="form-btn">
                    <button type="submit">Create</button>
                </div>

            </form>
        </div>
    )
}

export default CreateBug