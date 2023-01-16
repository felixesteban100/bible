import React from 'react'
import '../App.css'
import 'animate.css';

function Navbar({allVersionsBySelectedLanguage, selectedVersion, infoFinder, setInfoFinder, find, changeFontSize, changeColor, selectColor, fontSize, selectedBookName, selectedChapter, allBooksByVersionsSelected, allChapterBookSelected, findSelected}) {
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
                    <select value={selectedVersion.current} className="select-version" onChange={(event) => findSelected(event, "version")}>
                        {
                            allVersionsBySelectedLanguage.map((current, index) => {
                                return(
                                    <option key={index} value={current.short_name}>
                                        {current.full_name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='select-chapter-container'>
                    <select className='select-book' onChange={(event) => findSelected(event, "book")} value={selectedBookName.current}>
                        {
                            allBooksByVersionsSelected.map((current, index) => {
                                return(
                                    <option value={current.name} key={index}>{current.name}</option>
                                )
                            })
                        }
                    </select>
                    <select className='select-chapter' onChange={(event) => findSelected(event, "chapter")} value={selectedChapter.current}>
                        {
                            allChapterBookSelected.current.map((current, index) => {
                                return(
                                    <option value={current} key={index}>{current}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='select-fontSize-container'>
                    <select className='select-fontSize' name="" id="" onChange={event => changeFontSize(event)} value={fontSize}>
                        <option value="4rem">4rem</option>
                        <option value="2rem">2rem</option>
                        <option value="large">Large</option>
                        <option value="larger">Larger</option>
                        <option value="medium">Medium</option>
                        <option value="small">Small</option>
                        <option value="smaller">Smaller</option>
                        <option value="x-large">X-large</option>
                        <option value="x-small">X-small</option>
                        <option value="xx-large">XX-large</option>
                        <option value="xx-small">XX-small</option>
                    </select>
                    <select className='select-colorSelected' name="" id="" onChange={event => changeColor(event)} value={selectColor}>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                        <option value="pink">Pink</option>
                        <option value="brown">Brown</option>
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