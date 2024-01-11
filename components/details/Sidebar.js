import React from 'react'

function Sidebar({currentName}) {
  return (
    <div>
        currentName: {currentName}
        <hr/>  
        Number of Subscribers: 100
        Number of Posts: 100
        Currently Online
    </div>
  )
}

export default Sidebar   