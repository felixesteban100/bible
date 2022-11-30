import React, {useState} from 'react'
import '../App.css'
import 'animate.css';

function Navbar({returnHome, getBack, selectedBibleVersionAllInfo, selectedBookAllInfo, selectedChapterAllInfo}) {
    
    const [label, setLabel] = useState(false)


    return (
        <div>
            <div className='animate__animated animate__flipInX navbar-container'>
                <img onMouseEnter={() => setLabel(true)} onMouseLeave={() => setLabel(false)} onClick={() => returnHome()} className='getHome-logo' src="https://cdn-icons-png.flaticon.com/512/3389/3389387.png" alt="" />
                    {label && <p className='navbar-label'>Go home</p>}
                {   
                    selectedBibleVersionAllInfo !== undefined &&
                    <p onClick={() => getBack("book")} className='navbar-text' > ► {selectedBibleVersionAllInfo.abbreviation}</p>
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