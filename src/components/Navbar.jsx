import React, { useState, useEffect } from 'react'
import '../App.css'

function Navbar({returnHome, getBack, selectedBibleVersionAllInfo, selectedBookAllInfo, selectedChapterAllInfo}) {
  return (
    <div>
        <div className='navbar-container'>
            <img onClick={() => returnHome()} className='getHome-logo' src="https://cdn-icons-png.flaticon.com/512/3389/3389387.png" alt="" />
            {   
                selectedBibleVersionAllInfo !== undefined &&
                <p onClick={() => getBack("book")} className='navbar-text' > ► {selectedBibleVersionAllInfo.name}</p>
            }
            {   
                selectedBookAllInfo !== undefined &&
                <p onClick={() => getBack("chapter")} className='navbar-text'> ► {selectedBookAllInfo.name}</p>
            }
            {   
                selectedChapterAllInfo !== undefined &&
                <p onClick={() => getBack("chapterInfo")} className='navbar-text'> ► {selectedChapterAllInfo.number}</p>
            }
        </div>
    </div>
  )
}

export default Navbar