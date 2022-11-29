import React from 'react'
import "../App.css"

function Header({setHiddeNavbar}) {
  return (
    <div>
        <div className='header'>
            <p className='header--title'>Bible App</p>
            <img className='header--logo' src="https://cdn-icons-png.flaticon.com/512/3389/3389387.png" alt="" />
            <div className='button-hidde' onClick={() => setHiddeNavbar(prev => !prev)}>Hidde Navbar</div>
        </div>
    </div>
  )
}

export default Header