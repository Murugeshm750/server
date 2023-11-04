import React from 'react'

const Header = ({ handleCreateBugClick,handleUpdateBugClick,hanldeDleteBugClick,handleReadBugClick }) => {
    return (

        <header>
            <button className='home-btn' onClick={handleCreateBugClick}>Create</button>
            <button className='home-btn' onClick={handleUpdateBugClick}>Update</button>
            <button className='home-btn' onClick={hanldeDleteBugClick}>Delete</button>
            <button className='home-btn' onClick={handleReadBugClick}>Read</button>
        </header>

    )
}

export default Header