import React from 'react'
import '../App.css'
import 'animate.css';

function Navbar({allVersionsBySelectedLanguage, selectedLanguage, changeLanguage, changeVersion, selectedVersion, infoFinder, setInfoFinder, find}) {
    
    return (
        <div>
            <div className='navbar-container'>
                <div className='inputFinder-container'>
                    <input 
                        className='inputFinder' 
                        value={infoFinder} 
                        type="text" 
                        onChange={(event) => setInfoFinder(event.target.value)}
                    />
                    <button className='buttonFinder' onClick={() => find()}>
                        <img className='find-logo' src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="" />
                    </button>
                </div>
                <div className='select-version-container'>
                    <div className='select-language'>
                        <div className={selectedLanguage.current === "Español Spanish" ? "language-selected" : "language"} onClick={() => changeLanguage("Español Spanish")}>
                            <p>Spanish</p>
                        </div>
                        <div className={selectedLanguage.current === "English" ? "language-selected" : "language"}  onClick={() => changeLanguage("English")}>
                            <p>English</p>
                        </div>
                        <div className={selectedLanguage.current === "All" ? "language-selected" : "language"} onClick={() => changeLanguage("All")}>
                            <p>All</p>
                        </div>
                    </div>
                    
                    <select value={selectedVersion.current} className="select-version" onChange={(event) => changeVersion(event)}>
                        {
                            allVersionsBySelectedLanguage.map((current, index) => {
                                return(
                                    <option key={index} value={current.short_name}>
                                        {/* <p className='version-name'>{current.full_name}</p> */}
                                        {current.full_name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </div>
  )
}

export default Navbar


{/* <select value={selectedLanguage} className="select-language" onChange={(event) => changeLanguage(event)}>
                        {
                            allVersionsByLanguage.map((current, index) => {
                                return(
                                    <option key={index} value={current.language}>{current.language}</option>
                                )
                            })
                        }
                    </select> */}