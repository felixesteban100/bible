import React , {useEffect} from 'react'
import '../App.css'
import 'animate.css';
import axios from 'axios';

function Navbar({ infoFinder, setInfoFinder, find}) {
    
    useEffect(() => {  
        axios.get('https://bolls.life/static/bolls/app/views/languages.json')
        // .then(data => console.log(data.data))
    }, [])


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
                    {/* <select value={seletedVersion} className="select-version" id="select-version" onChange={(event) => selectVersion(event)}>
                        {
                            selectedLanguage === "All" &&
                            allVersions.map((current, index) => {
                                return(
                                    <option key={index} value={current}>{current}</option>
                                )
                            })
                        }
                    </select> */}
                </div>
            </div>
        </div>
  )
}

export default Navbar