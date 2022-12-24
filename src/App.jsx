import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import Header from './components/Header'
import Navbar from './components/Navbar'
import Error from './components/Error';
import Loading from './components/Loading';
import Footer from './components/Footer';
import VerseOfDay from './components/VerseOfDay';
import { useRef } from 'react';
import 'animate.css';

function App() {
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const [theme, setTheme] = useState(true)

  const [infoFinder, setInfoFinder] = useState("")
  const [verseofday, setVerseofday] = useState(true)
  const [translate, setTranslate] = useState(true)

  const [allVersionsByLanguage, setAllVersionsByLanguage] = useState([])
  const [allVersionsBySelectedLanguage, setAllVersionsBySelectedLanguage] = useState([])
  const [allVersions, setAllVersions] = useState([])
  const [allBooksByVersions, setAllBooksByVersions] = useState([])

  // const [selectedLanguage, setSelectedLanguage] = useState('Español Spanish')
  // const [selectedVersion, setSelectedVersion] = useState("RV1960")
  // const [selectedBookName, setSelectedBookName] = useState('')
  // const [selectedBookId, setSelectedBookId] = useState()
  // const [selectedChapter, setSelectedChapter] = useState('')

  const selectedLanguage = useRef('Español Spanish')
  const selectedVersion = useRef("RV1960")
  const selectedBookName = useRef('')
  const selectedBookId = useRef()
  const selectedChapter = useRef('')

  const [chapterInfo, setChapterInfo] = useState([])

  useEffect(() => {
    setTheme((localStorage.getItem("theme") === "true"))
    
    if (localStorage.getItem("selectedLanguage") !== undefined && localStorage.getItem("selectedLanguage") !== null) {
      selectedLanguage.current = localStorage.getItem("selectedLanguage")
    }
    if (localStorage.getItem("selectedVersion") !== undefined && localStorage.getItem("selectedLanguage") !== null) {
      selectedVersion.current = localStorage.getItem("selectedVersion")
    }

    axios.get('https://bolls.life/static/bolls/app/views/languages.json')
    .then(data => {
      setAllVersionsByLanguage(data.data)
      setAllVersionsBySelectedLanguage(data.data.filter((current) => current.language === selectedLanguage.current)[0].translations)
    })
    .catch(err => setError(err))

    axios.get(`https://bolls.life/static/bolls/app/views/translations_books.json`)
    .then(res => setAllVersions(res.data))
    .catch(err => setError(err))    
  }, [])

  useEffect(() => {
    allVersionsByLanguage.forEach(element => {
      element.translations.map((current) => {
        axios.get(`https://bolls.life/get-books/${current.short_name}/`)
        .then(res => {
          let other = {
            "name": current.short_name,
            "data": res.data
          }
          setAllBooksByVersions(prev => [...prev, other])
        })
        .catch(err => setError(err))
      })
    });
    
  }, [allVersionsByLanguage])


  function quitarAcentos(cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }

  function highlightText(verse){
    let selectedVerses = localStorage.getItem('selectedVerses') !== null ? JSON.parse(localStorage.getItem('selectedVerses')) : []

    let sended = {"verse": verse, "bookName": selectedBookName.current, "chapter": selectedChapter.current, "bookId": selectedBookId.current}
    let isAlReady = false
    
    selectedVerses.forEach(current => {
      if(JSON.stringify(current) === JSON.stringify(sended)){
        isAlReady = true
      }
    })

    if (isAlReady === true) {
      selectedVerses = selectedVerses.filter(current => JSON.stringify(current) !== JSON.stringify(sended))
    }else{
      selectedVerses = [...selectedVerses, sended]
    }
    localStorage.setItem("selectedVerses", JSON.stringify(selectedVerses))
    
    getTheData(selectedVersion.current, selectedBookId.current, selectedChapter.current)
  }

  function getTheData(version, bookId, chapter){
    axios.get(`https://bolls.life/get-chapter/${version}/${bookId}/${chapter}/`)
    .then(res => {
      let selectedVerses = localStorage.getItem('selectedVerses') !== null ? JSON.parse(localStorage.getItem('selectedVerses')) : []

      let chapter = res.data
      chapter = chapter.map((currentVerse) => {
        currentVerse.selected = "No"
        selectedVerses.map((currentSelected) => {
          if (currentSelected.bookName === selectedBookName.current 
            && currentSelected.chapter === selectedChapter.current 
            && currentSelected.verse === currentVerse.verse) {
              currentVerse.selected = "Yes"
          }
        })
        return currentVerse
      })
      setChapterInfo(chapter)
      setLoading(false)
      setError(undefined)
    })
    .catch(error => {
      setLoading(false)
      setError(error)
    })
  }

  function find(){
    setVerseofday(false)
    setError(undefined)
    setLoading(true)
    setChapterInfo([])

    const regExpBook = new RegExp(/[1-3]* *[A-Za-z]+/)
    const regExpChapter = new RegExp(/ [0-9]+/)
  
    let localselectedBookName = infoFinder.match(regExpBook)[0]
    let localselectedBookId
    allBooksByVersions.map(current => {
      if (current.name === selectedVersion.current) {
        current.data.map(current => {
          if (quitarAcentos(current.name.toLowerCase()) === quitarAcentos(localselectedBookName.toLowerCase())) {
            localselectedBookId = current.bookid
            localselectedBookName = current.name
          }
        })
      }
    })
    const localselectedChapter = infoFinder.match(regExpChapter) !== null ? infoFinder.match(regExpChapter)[0].slice(1) : undefined

    // console.log(`https://bolls.life/get-chapter/${selectedVersion.current}/${localselectedBookId}/${localselectedChapter}/`)

    if ((localselectedBookId !== undefined && localselectedBookId !== null)  && (localselectedChapter !== undefined && localselectedChapter !== null)) {
      getTheData(selectedVersion.current, localselectedBookId, localselectedChapter)
    }else{
      setLoading(false)
      setError({message: "Mislead information, please try again"})
    }

    // setSelectedBookName(localselectedBookName[0].toUpperCase() + localselectedBookName.slice(1).toLowerCase())
    // setSelectedBookId(localselectedBookId)
    // setSelectedChapter(localselectedChapter)

    selectedBookName.current = localselectedBookName[0].toUpperCase() + localselectedBookName.slice(1).toLowerCase()
    selectedBookId.current = localselectedBookId
    selectedChapter.current = localselectedChapter

    setInfoFinder("")
  }

  function readFull(bookId, chapter, nameofverse){
    setLoading(true)
    selectedBookId.current = bookId
    selectedChapter.current = chapter
    selectedBookName.current = nameofverse
    
    getTheData(selectedVersion.current, bookId, chapter)
  }

  function changeTranslation(){
    setVerseofday(false)
    setError(undefined)
    setLoading(true)
    setChapterInfo([])
    setTranslate(true)

    getTheData(selectedVersion.current, selectedBookId.current, selectedChapter.current)

    Object.keys(allVersions).map((current) => {
      if (current === selectedVersion.current) {
        allVersions[current].map((currentBook) => {
          if (currentBook.bookid === selectedBookId.current) {
            // setSelectedBookName(currentBook.name)
            selectedBookName.current = currentBook.name
          }
        })
      }
    })    
  }

  function changeVersion(event){
    // setSelectedVersion(event.target.value)
    selectedVersion.current = event.target.value
    if (selectedBookId.current !== undefined && selectedChapter.current !== undefined) {
      changeTranslation()
    }
    setTranslate(true)
    localStorage.setItem("selectedVersion", event.target.value)
  }

  function changeLanguage(language){
    // setSelectedLanguage(language)
    selectedLanguage.current = language
    setTranslate(true)

    let seleted 
    if (language !== "All") {
      seleted = allVersionsByLanguage.filter((current) => current.language === language)
      setAllVersionsBySelectedLanguage(seleted[0].translations)
    }else{
      let alltranslations = []
      allVersionsByLanguage.forEach(element => {
        alltranslations.push(...element.translations)
      });
      setAllVersionsBySelectedLanguage(alltranslations)
    }

    switch (language) {
      case "All":
        // setSelectedVersion(prev => prev)
      break;

      case "Español Spanish":
        // setSelectedVersion("RV1960")
        selectedVersion.current = "RV1960"
        if (selectedBookId.current !== undefined && selectedChapter.current !== undefined) {
          changeTranslation()
        }
      break;

      case "English":
        // setSelectedVersion("NASB")
        selectedVersion.current = "NASB"
        if (selectedBookId.current !== undefined && selectedChapter.current !== undefined) {
          changeTranslation()
        }
      break;
    
      default:
        
      break;
    }
    localStorage.setItem("selectedLanguage", selectedLanguage.current)
    localStorage.setItem("selectedVersion", selectedVersion.current)
  }

  function changeChapter(where){
    setError(undefined)
    setLoading(true)

    switch (where) {
      case "previous":
        selectedBookId.current = selectedBookId.current
        selectedChapter.current = selectedChapter.current - 1

        if (selectedChapter.current === 0) {
          selectedBookId.current = selectedBookId.current - 1
          allBooksByVersions.forEach((currentversion) => {
            if (currentversion.name === selectedVersion.current) {
              currentversion.data.forEach((currentBook) => {
                if (currentBook.bookid === selectedBookId.current) {
                  selectedChapter.current = currentBook.chapters
                  selectedBookName.current = currentBook.name
                }
              })
            }
          })
        }

        getTheData(selectedVersion.current, selectedBookId.current, selectedChapter.current)
      break;

      case "next":
        selectedBookId.current = selectedBookId.current
        selectedChapter.current = selectedChapter.current + 1

        let howManyChaptersHave
        allBooksByVersions.forEach((currentversion) => {
          if (currentversion.name === selectedVersion.current) {
            currentversion.data.forEach((currentBook) => {
              if (currentBook.bookid === selectedBookId.current) {
                howManyChaptersHave = currentBook.chapters
              }
            })
          }
        })

        if (selectedChapter.current > howManyChaptersHave) {
          selectedBookId.current = selectedBookId.current + 1
          selectedChapter.current = 1

          allBooksByVersions.forEach((currentversion) => {
            if (currentversion.name === selectedVersion.current) {
              currentversion.data.forEach((currentBook) => {
                if (currentBook.bookid === selectedBookId.current) {
                  selectedBookName.current = currentBook.name
                }
              })
            }
          })
        }

        getTheData(selectedVersion.current, selectedBookId.current, selectedChapter.current)
      break;
    
      default:
      break;
    }
  }

  function changeTheme(){
    setTheme(prev => !prev)
    localStorage.setItem("theme", !theme)
  }

  return (
    <div className={theme ? "animate__animated animate__fadeIn App-dark" : "animate__animated animate__fadeIn App-light"}>
      <Header 
        theme={theme}
        changeTheme={changeTheme}
      />
      <Navbar
        infoFinder={infoFinder}
        setInfoFinder={setInfoFinder}
        find={find}
        selectedVersion={selectedVersion}
        changeVersion={changeVersion}
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
        allVersionsBySelectedLanguage={allVersionsBySelectedLanguage}
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
            (verseofday && error === undefined && loading === false && chapterInfo.length === 0 && allVersions !== undefined && allVersions.length !== 0) ?
              <VerseOfDay
                allVersions={allVersions}
                setLoading={setLoading}
                setError={setError}
                selectedVersion={selectedVersion}
                allVersionsByLanguage={allVersionsByLanguage}
                translate={translate}
                setTranslate={setTranslate}
                readFull={readFull}
              />
              :
              null
          }
          {
            (loading === false && chapterInfo.length !== 0) && 
            <div className='content-container'>
              <p className='content-title'>{selectedBookName.current} {selectedChapter.current}</p>
              <p className='content-translation'>{selectedVersion.current}</p>
              <br />
              <div className='controlers-container'>
                {/* <button className='previous-chapter' onClick={() => changeChapter("previous")}>{selectedBookName.current} {parseInt(selectedChapter.current) - 1}</button>
                <button className='next-chapter' onClick={() => changeChapter("next")}>{selectedBookName.current} {parseInt(selectedChapter.current) + 1}</button> */}
                <button className='controller-chapter' onClick={() => changeChapter("previous")}>Previous Chapter</button>
                <button className='controller-chapter' onClick={() => changeChapter("next")}>Next Chapter</button>
              </div>
              <br />
              {
                chapterInfo.map((current, index) => {
                  return(
                    <p key={index} className="content-verse" >
                      <span className='content-verse-number'>{current.verse} </span> 
                      {/* <span>{current.text}</span>  */}
                      <span 
                        // className={!selectedVerses.includes({"verse": current.verse, "bookName": selectedBookName, "chapter": selectedChapter}) ? "verse" : "verse-selected"} 
                        className={current.selected === "No" ? "verse" : "verse-selected"} 
                        dangerouslySetInnerHTML={{ __html: current.text }} 
                        onClick={() => highlightText(current.verse)}/>
                    </p>
                  )
                })
              }
              <br />
              <div className='controlers-container'>
                <button className='controller-chapter' onClick={() => changeChapter("previous")}>Previous Chapter</button>
                <button className='controller-chapter' onClick={() => changeChapter("next")}>Next Chapter</button>
              </div>
            </div>
          }
          
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App