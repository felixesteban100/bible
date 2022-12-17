import React, { useState, useEffect } from 'react'
import "../App.css"
import 'animate.css';
import axios from 'axios';

function VerseOfDay({allBooks, selectedVersion, setLoading, setError}) { 
    const [verseOfDay, setVerseOfDay] = useState()
    const [nameofverse, setNameofVerse] = useState()
    
    useEffect(() => {
        setLoading(true)
        let randomBookId = Math.floor(Math.random() * 66)
        let randomChapter = Math.floor(Math.random() * 10)

        allBooks.map(current => {
            if(current.bookid === randomBookId){
                setNameofVerse(`${current.name} ${randomChapter}`)
            }
        })
        
        axios.get(`https://bolls.life/get-chapter/${selectedVersion}/${randomBookId}/${randomChapter}/`)
          .then(res => {
            const chapter = res.data
            console.log(chapter)
            setVerseOfDay(chapter[Math.floor(Math.random() * chapter.length)])
          })
          .catch((error) => {
            setError(error)
          })
        setLoading(false)
    }, [])

    console.log(verseOfDay)


    return (
        <div>
            <div className='verseofday-container'>
                <p className='verseofday-header'>{nameofverse}</p>
                {/* <p className='verseofday-text'>{verseOfDay.verse} {verseOfDay.text}</p> */}
            </div>
        </div>
    )
}

export default VerseOfDay