import React, { useState } from 'react'
import { useEffect } from 'react'
import "../App.css"

function BiblesList({getVersion}) {
  
    const [bibles, setBibles] = useState([])
  
    useEffect(() => {
        const url = "https://api.scripture.api.bible/v1/bibles"
        const token = "4aad4efe36364c95d44b4bbbdcffa9b0"
        async function fetchBibles(){
            try {
                let header = {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': `${token}`
                    }  
                };
                const data = await fetch(url, header);
                const bibles = await data.json()
                // console.log(bibles.data)

                const biblesEnglishAndSpanish = bibles.data.filter((current) => {
                    if (current.language.name === "Spanish" || current.language.name === "English") {
                        return current
                    }
                })
                
                console.log(biblesEnglishAndSpanish)
                setBibles(biblesEnglishAndSpanish)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBibles()
    }, [])

    return (
        <div className='biblesList-container'>
            {
                bibles.map((current, index) => {
                    return(
                        <div key={index} className='bible-container' onClick={() => getVersion(current)}>
                            <p className='bible-name'>{current.name}</p>
                            <p className='bible-abbreviation'>({current.abbreviation})</p>
                            <p className='bible-namelocal'>Name local: {current.nameLocal}</p>
                            {
                                current.description !== null &&
                                <div className='bible-description'>
                                    <p className='bible-description-title'>Description:</p>
                                    <p className='bible-description-info'>{current.description}</p>
                                </div>
                            }
                            <div className='bible-languages'>
                                <p className='bible-languages-title'>Languagues</p>
                                <div className='bible-languagesList'>
                                    <div className='bible-language'>
                                        <p className='bible-language-name'>{current.language.name}</p>
                                    </div>
                                </div>
                            </div> 
                            {
                                current.countries.length > 0 &&
                                <div className='bible-countries'>
                                    <p className='bible-countries-title'>Countries</p>
                                    <div className='bible-countriesList'>
                                        {current.countries.map((current, index) => {
                                            if (index < 2) {
                                                return(
                                                    <div key={index} className="bible-countrie">
                                                        <p className='bible-countrie-name'>{current.name}</p>
                                                    </div>
                                                )
                                            }
                                            if (index === 2) {
                                                return(
                                                    <div key={index} className="bible-countrie">
                                                        <p className='bible-countrie-name'>...</p>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
  )
}

export default BiblesList