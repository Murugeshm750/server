// import React, { useState } from 'react';
import CreateBug from './CreateBug';
import EditBugs from './EditBugs';
import DeleteBug from './DeleteBug'
import ReadBugs from './ReadBugs';
import UpdateBug from './UpdateBug';

const Dashboard = ({ showCreateBugs, showUpdateBugs,showDeleteBugs,showReadBugs }) => {

    return (
        <div>
            {showCreateBugs && <CreateBug />}
            {/* {showUpdateBugs && <EditBugs />} */}
            {showUpdateBugs && <UpdateBug/>}
            {showDeleteBugs && <DeleteBug />}
            {showReadBugs && <ReadBugs/>}
        </div>
    );
};

export default Dashboard;
