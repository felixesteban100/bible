import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Header from './components/Header'
import Navbar from './components/Navbar'
import Error from './components/Error';
import Loading from './components/Loading';
import Footer from './components/Footer';
import VerseOfDay from './components/VerseOfDay';

function App() {
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const [infoFinder, setInfoFinder] = useState("")

  const [selectedVersion, setSelectedVersion] = useState("NASB")
  const [allBooks, setAllBooks] = useState([])

  const [selectedBookName, setSelectedBookName] = useState('')
  const [selectedBookId, setSelectedBookId] = useState()
  const [selectedChapter, setSelectedChapter] = useState('')

  const [chapterInfo, setChapterInfo] = useState([])

  useEffect(() => {
    axios.get(`https://bolls.life/get-books/${selectedVersion}/`)
    .then(res => setAllBooks(res.data))
  }, [])

  function find(){
    setError()
    setLoading(true)
    setChapterInfo([])

    const regExpBook = new RegExp(/[1-3]* *[A-Za-z]+/)
    const regExpChapter = new RegExp(/ [1-9]+/)
  
    const localselectedBookName = infoFinder.match(regExpBook)[0]
    let localselectedBookId
    allBooks.map(current => {
      if (current.name.toLowerCase() === localselectedBookName.toLowerCase()) {
        localselectedBookId = current.bookid
      }
    })
    const localselectedChapter = infoFinder.match(regExpChapter)[0].slice(1)

    console.log("localselectedChapter", localselectedChapter)

    if ((localselectedBookId !== undefined && localselectedBookId !== null)  && (localselectedChapter !== undefined && localselectedChapter !== null)) {
      axios.get(`https://bolls.life/get-chapter/${selectedVersion}/${localselectedBookId}/${localselectedChapter}/`)
        .then(res => {
          const chapter = res.data
          setChapterInfo(chapter)
          setLoading(false)
          setError(undefined)
        })
        .catch(error => {
          setLoading(false)
          setError(error)
        })
    }else{
      setLoading(false)
      setError({message: "Mislead information, please try again"})
    }

    setSelectedBookName(localselectedBookName[0].toUpperCase() + localselectedBookName.slice(1).toLowerCase())
    setSelectedBookId(localselectedBookId)
    setSelectedChapter(localselectedChapter)
  }

  return (
    <div className="App">
      <Header />
      <Navbar
        infoFinder={infoFinder}
        setInfoFinder={setInfoFinder}
        find={find}
      />
      <div className="app-content">
        <div>
          {
            loading &&
            <Loading/>
          }
          {
            error !== undefined &&
            <Error
              hasErrors={error.message}
            />
          }
          {
            (loading === false && chapterInfo.length === 0 && chapterInfo[0] !== "Mislead information, please try again") && 
            <VerseOfDay
            allBooks={allBooks}
            setLoading={setLoading}
            setError={setError}
            selectedVersion={selectedVersion}
            />
          }
          {
            (loading === false && chapterInfo.length !== 0 && chapterInfo !== undefined && chapterInfo[0] !== "Mislead information, please try again") && 
            <div className='content-container'>
              <p className='content-title'>{selectedBookName} {selectedChapter}</p>
              <p className='content-translation'>{selectedVersion}</p>
              {
                chapterInfo.map((current, index) => {
                  return(
                    <p key={index} className="content-verse" ><strong>{current.verse}</strong> {current.text}</p>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App


// if (infoFinder.includes(":") && !infoFinder.includes("-")) {
      //   const regExpBook = new RegExp(/[A-Za-z]+/)
      //   const regExpChapter = new RegExp(/[0-9]+:/)
      //   const regExpVerse = new RegExp(/:[0-9]+/)

      //   const book = infoFinder.match(regExpBook)[0]
      //   const chapter = infoFinder.match(regExpChapter)[0].slice(0, -1)
      //   const verse = infoFinder.match(regExpVerse)[0].slice(1)

      //   if (book !== undefined && chapter !== undefined && verse !== undefined) {
      //     // axios.get(`https://bible-api.com/${book} ${chapter}:${verse}?translation=kjv`)
      //     axios.get(`https://bolls.life/get-text/kjv/${book}/${chapter}/`)
      //     .then(res => {
      //       const chapter = res.data
      //       // console.log(chapter)
      //       setChapterInfo(chapter)
      //     })
      //     .catch((error) => {
      //       console.log("error sended:", error.res)
      //       setError(error)
      //     })
      //   }else{
      //     setChapterInfo(["Mislead information, please try again"])
      //   }

      // }else if (infoFinder.includes("-")) {
      //   const regExpBook = new RegExp(/[A-Za-z]+/)
      //   const regExpChapter = new RegExp(/[0-9]+:/)
      //   const regExpVerse = new RegExp(/:[0-9]+-[0-9]+/)

      //   const book = infoFinder.match(regExpBook)[0]
      //   const chapter = infoFinder.match(regExpChapter)[0].slice(0, -1)
      //   const verses = infoFinder.match(regExpVerse)[0].slice(1)

      //   if (book !== undefined && chapter !== undefined && verses !== undefined) {
      //     // axios.get(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapter}/verse/${verse}`)
      //     // axios.get(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapter}`)
      //     // axios.get(`https://bible-api.com/${book} ${chapter}:${verses}?translation=kjv`)
      //     axios.get(`https://bolls.life/get-text/kjv/${book}/${chapter}/`)
      //     .then(res => {
      //       const chapter = res.data
      //       console.log(chapter)
      //       setChapterInfo(chapter)
      //     })
      //     .catch((error) => {
      //       console.log("error sended:", error.res)
      //       setError(error)
      //     })
      //   }else{
      //     setChapterInfo(["Mislead information, please try again"])
      //   }

      // }else{
      //}