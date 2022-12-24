import React from 'react'
import "../App.css"

function Header({theme, changeTheme}) {
  return (
    <div>
        <div className='header'>
            <div className='header-title-container'>
              <p className='header--title'>Bible App</p>
              <img className='header--logo' src="https://cdn-icons-png.flaticon.com/512/3389/3389387.png" alt="" />
            </div>
            <button className='header-button' onClick={() => changeTheme()}>{theme ? "Dark" : "Light"}</button>
        </div>
    </div>
  )
}

export default Header