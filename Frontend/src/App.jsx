import './App.css'
import CreateBug from './components/CreateBug';
import Dashboard from './components/Dashboard';
import EditBugs from './components/EditBugs';
import Header from './components/Header';
import React, { useState, useEffect } from 'react';
import axios from 'axios'



function App() {

  const [showCreateBugs, setShowCreateBugs] = useState(false);
  const [showUpdateBugs, setShowUpdateBugs] = useState(false);
  const [showDeleteBugs, setShowDeleteBugs] = useState(false);
  const [showReadBugs, setShowReadBugs] = useState(false);


  const handleCreateBugClick = () => {
    setShowCreateBugs(true);
    setShowUpdateBugs(false);
    setShowDeleteBugs(false)
    setShowReadBugs(false);
  };
  const handleUpdateBugClick = () => {
    setShowUpdateBugs(true);
    setShowCreateBugs(false);
    setShowDeleteBugs(false)
    setShowReadBugs(false); 
  };
  const hanldeDleteBugClick = () => {
    setShowDeleteBugs(true)
    setShowCreateBugs(false);
    setShowUpdateBugs(false);
    setShowReadBugs(false);
  }
  const handleReadBugClick = () => {
    setShowReadBugs(true);
    setShowDeleteBugs(false)
    setShowCreateBugs(false);
    setShowUpdateBugs(false);
  }

  return (
    <div>
      <Header
        handleCreateBugClick={handleCreateBugClick}
        showCreateBugs={showCreateBugs}
        handleUpdateBugClick={handleUpdateBugClick}
        showUpdateBugs={showUpdateBugs}
        hanldeDleteBugClick={hanldeDleteBugClick}
        showDeleteBugs={showDeleteBugs} 
        showReadBugs={showReadBugs}
        handleReadBugClick={handleReadBugClick}/>
      <Dashboard
        handleCreateBugClick={handleCreateBugClick}
        showCreateBugs={showCreateBugs}
        handleUpdateBugClick={handleUpdateBugClick}
        showUpdateBugs={showUpdateBugs}
        hanldeDleteBugClick={hanldeDleteBugClick}
        showDeleteBugs={showDeleteBugs}
        showReadBugs={showReadBugs}
        handleReadBugClick={handleReadBugClick} />
      {/* <CreateBug /> */}

    </div>
  )
}

export default App
