import React, { useState, useEffect } from 'react'
import "../App.css"
// import 'animate.css';
import axios from 'axios';

function VerseOfDay({readFull, translate,setTranslate, allVersions, allVersionsByLanguage, selectedVersion, selectedLanguage, setLoading, setError}) { 
    const [verseOfDay, setVerseOfDay] = useState({})
    const [nameofverse, setNameofVerse] = useState()

    const [bookId, setBookId] = useState()
    const [chapter, setChapter] = useState()
    const [verse, setVerse] = useState()
    
    useEffect(() => {
        // console.log({bookId, chapter, verseOfDay})
        if (translate === true && bookId === undefined && chapter === undefined) {
            setLoading(true)
            let randomBookId = Math.floor(Math.random() * (allVersions[selectedVersion.current].length - 1))
            let randomChapter = 0
            do {
                randomChapter = Math.floor(Math.random() * (allVersions[selectedVersion.current][randomBookId].chapters - 1))
            }while(randomChapter <= 0)

            allVersions[selectedVersion.current].map(current => {
                if(current.bookid === randomBookId){
                    setNameofVerse({
                        "name": `${current.name}`, 
                        "chapter": `${randomChapter}`
                    })
                }
            })
            
            axios.get(`https://bolls.life/get-chapter/${selectedVersion.current}/${randomBookId}/${randomChapter}/`)
            .then(res => {
                const chapter = res.data
                const randomNumber = Math.floor(Math.random() * (chapter.length - 1))
                setVerse(randomNumber)
                setVerseOfDay(chapter[randomNumber])
            })
            .catch(err => setError(err))

            setBookId(randomBookId)
            setChapter(randomChapter)
            setLoading(false)
            setTranslate(false)
        } else if (translate === true && bookId !== undefined && chapter !== undefined) {
            setLoading(true)

            allVersions[selectedVersion.current].map(current => {
                if(current.bookid === bookId){
                    setNameofVerse({
                        "name": `${current.name}`, 
                        "chapter": `${chapter}`
                    })
                }
            })
            
            axios.get(`https://bolls.life/get-chapter/${selectedVersion.current}/${bookId}/${chapter}/`)
            .then(res => {
                const info = res.data
                setVerseOfDay(info[verse])
            })
            .catch(err => setError(err))

            setLoading(false)
            setTranslate(false)
        }

    }, [translate/* selectedVersion, selectedLanguage */])

    return (
        <div>
            <div className='verseofday-container'>
            {
                verseOfDay && nameofverse ?
                <p className='verseofday-header'>{nameofverse.name} {nameofverse.chapter}</p>
                :
                null
            }
            {
                verseOfDay ?
                <p className='verseofday-text'><span className='verseofday-verse-number'>{verseOfDay.verse}</span> <span dangerouslySetInnerHTML={{ __html: verseOfDay.text }} /></p>
                
                :
                null
            }
            <button className='readfull-button' onClick={() => readFull(bookId, chapter, nameofverse.name)}>Read full chapter</button>
            </div>
        </div>
    )
}

export default VerseOfDay