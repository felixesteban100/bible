import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {
  const [spanishVersions, setSpanishVersions] = useState([])
  const [englishVersions, setEnglishVersions] = useState([])
  const [allVersions, setAllVersions] = useState([])

  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [selectedVersion, setSelectedVersion] = useState("King James (Authorised) Version")

  const [infoFinder, setInfoFinder] = useState("")

  const [books, setBooks] = useState([])

  const [youCanFind, setYouCanFind] = useState(false)

  const [chapterInfo, setChapterInfo] = useState([])

  useEffect(() => {
    axios.get('https://bible-go-api.rkeplin.com/v1/translations')
    .then(res => {
      const bibles = res
      const allVersionsArr = []
      bibles.data.forEach((version) => {
          allVersionsArr.push(version.version)
      })
      setAllVersions(allVersionsArr)
    
      const spanishVersionsArr = []
      bibles.data.forEach((version) => {
        if (version.language === "spanish") {
          spanishVersionsArr.push(version.version)
        }
      })
      setSpanishVersions(spanishVersionsArr)
      
      const englishVersionsArr = []
      bibles.data.forEach((version) => {
        if (version.language === "english") {
          englishVersionsArr.push(version.version)
        }
      })
      setEnglishVersions(englishVersionsArr)
    })
    
    axios.get('https://bible-go-api.rkeplin.com/v1/books')
    .then(res => setBooks(res.data))
  }, [])

  useEffect(() => {
    // console.log(infoFinder)
    if (youCanFind === true) {
      if (infoFinder.includes(":")) {
        const regExpBook = new RegExp(/[A-Za-z]+/)
        const regExpChapter = new RegExp(/[0-9]+:/)
        const regExpVerse = new RegExp(/:[0-9]+/)

        const book = infoFinder.match(regExpBook)
        const chapter = infoFinder.match(regExpChapter)
        const verse = infoFinder.match(regExpVerse)
        let bookId 

        // books.forEach((current) => {
        //   if(current.name.toLowerCase() === book.toLowerCase()){
        //     bookId = current.id
        //   }
        // })

        // if (bookId !== undefined && chapter !== undefined) {
        //   axios.get(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapter}/verse/${verse}`)
        //   .then(res => {
        //     const chapter = res.data
        //     setChapterInfo(chapter)
        //     // console.log(chapter)
        //   })
        // }else{
        //   setChapterInfo(["Mislead information, please try again"])
        // }

      }else{
        const regExpBook = new RegExp(/[1-3]* *[A-Za-z]+/)
        const regExpChapter = new RegExp(/[A-Za-z] [1-9]+/)
      
        const book = infoFinder.match(regExpBook)[0]
        let chapter = infoFinder.match(regExpChapter)[0]
        chapter = chapter.match(/[0-9]/)
        let bookId 
        console.log(chapter)

        books.forEach((current) => {
          if(current.name.toLowerCase() === book.toLowerCase()){
            bookId = current.id
          }
        })

        if (bookId !== undefined && chapter !== undefined) {
          axios.get(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapter}`)
          .then(res => {
            const chapter = res.data
            setChapterInfo(chapter)
          })
        }else{
          setChapterInfo(["Mislead information, please try again"])
        }
      }
      setYouCanFind(false)
    }
  }, [youCanFind])

  function selectVersion(event){
    setSelectedVersion(event.target.value)
  }

  function find(value){
    setYouCanFind(value)
  }

  return (
    <div className="App">
      <Header />
      <Navbar
        allVersions={allVersions}
        spanishVersions={spanishVersions}
        englishVersions={englishVersions}
        selectedLanguage={selectedLanguage}
        selectVersion={selectVersion}
        selectedVersion={selectedVersion}
        infoFinder={infoFinder}
        setInfoFinder={setInfoFinder}
        find={find}
      />
      <div className="app-content">
        <div>
          {
            chapterInfo.length === 1 &&
            <h1>{chapterInfo[0]}</h1>
          }
          {/* {
            (chapterInfo.length !== 0 && chapterInfo.length !== 1) && 
            <button></button>
          } */}
          {
            (chapterInfo.length !== 0 && chapterInfo.length !== 1) && 
            <div className='content-container'>
              <p className='content-title'>{chapterInfo[0].book.name} {chapterInfo[0].chapterId}</p>
              {
                chapterInfo.map((current, index) => {
                  return(
                    <p key={index} className="content-verse" ><strong>{current.verseId}</strong> {current.verse}</p>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App




// const token = "4aad4efe36364c95d44b4bbbdcffa9b0"
  // const header = {
  //   method: 'GET',
  //   mode: 'cors',
  //   headers: {
  //       'Content-Type': 'application/json',
  //       'api-key': token
  //   }  
  // };
  // const url = "https://api.scripture.api.bible/v1/bibles"
  // useEffect(() => {
  //     axios.get(url, header)
  //     .then(res => {
  //       const bibles = res.data

  //       const allVersionsArr = []
  //       bibles.data.forEach((version) => {
  //           allVersionsArr.push(version.name)
  //       })
  //       setAllVersions(allVersionsArr)
      
  //       const spanishVersionsArr = []
  //       bibles.data.forEach((version) => {
  //         if (version.language.name === "Spanish") {
  //           spanishVersionsArr.push(version.name)
  //         }
  //       })
  //       setSpanishVersions(spanishVersionsArr)
        
  //       const englishVersionsArr = []
  //       bibles.data.forEach((version) => {
  //         if (version.language.name === "English") {
  //           englishVersionsArr.push(version.name)
  //         }
  //       })
  //       setEnglishVersions(englishVersionsArr)
  //     })   
  // }, [])