import React, {useEffect} from 'react'
import '../App.css'
import 'animate.css';

function Navbar({allVersionsBySelectedLanguage, selectedVersion, infoFinder, setInfoFinder, find, changeFontSize, changeColor, selectColor, fontSize, selectedBookName, selectedChapter, allBooksByVersionsSelected, allChapterBookSelected, findSelected}) {
    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                find()
            }
        });
    })


    return (
        <div>
            <div className='navbar-container'>
                <div className='inputFinder-container'>
                    <div className='container-label-input'>
                        <label className='label' htmlFor="search-bar">Search - Format: [Book name]: [chapter number]</label>
                        <input 
                            name='search-bar'
                            className='inputFinder' 
                            value={infoFinder} 
                            type="text" 
                            onChange={(event) => setInfoFinder(event.target.value)}
                        />
                    </div>
                    <button className='buttonFinder' onClick={() => find()}>
                        <img className='find-logo' src="https://cdn-icons-png.flaticon.com/512/149/149852.png" alt="" />
                    </button>
                </div>
                <div className='select-version-container'>
                    <label className='label' htmlFor="">Select version</label>
                    <select name='version' value={selectedVersion.current} className="select-version" onChange={(event) => findSelected(event, "version")}>
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
                    <div className='container-label-input'>
                        <label className='label' htmlFor="">Select book</label>
                        <select className='select-book' onChange={(event) => findSelected(event, "book")} value={selectedBookName.current}>
                            {
                                allBooksByVersionsSelected.map((current, index) => {
                                    return(
                                        <option value={current.name} key={index}>{current.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='container-label-input'>
                        <label className='label' htmlFor="">Select chapter</label>
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
                </div>
                <div className='select-fontSize-container'>
                    <div className='container-label-input'>
                        <label className='label' htmlFor="">Select font size</label>
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
                    </div>
                    <div className='container-label-input'>
                        <label className='label' htmlFor="">Select highlight color</label>
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