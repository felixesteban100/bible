import React from 'react'
import '../App.css'
import 'animate.css';

function Navbar({allVersions, englishVersions, spanishVersions, selectedLanguage, seletedVersion, selectVersion, infoFinder, setInfoFinder, find}) {
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
                    <button className='buttonFinder' onClick={() => find(true)}>Find</button>
                </div>
                <div className='select-version-container'>
                    <select value={seletedVersion} className="select-version" id="select-version" onChange={(event) => selectVersion(event)}>
                        {
                            selectedLanguage === "All" &&
                            allVersions.map((current, index) => {
                                return(
                                    <option key={index} value={current}>{current}</option>
                                )
                            })
                        }
                        {
                            selectedLanguage === "English" &&
                            englishVersions.map((current, index) => {
                                return(
                                    <option key={index} value={current}>{current}</option>
                                )
                            })
                        }
                        {
                            selectedLanguage === "Spanish" &&
                            spanishVersions.map((current, index) => {
                                return(
                                    <option key={index} value={current}>{current}</option>
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