import React, { useState, useRef } from 'react'
import { useQuery } from 'react-query'
import './App.css'
import axios from 'axios';
import Header from './components/Header'
import Navbar from './components/Navbar'
import Error from './components/Error';
import Loading from './components/Loading';
import Footer from './components/Footer';
// import VerseOfDay from './components/VerseOfDay';
import 'animate.css';

function App() {
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const [theme, setTheme] = useState(true)

  const [infoFinder, setInfoFinder] = useState("")
  
  const [fontSize, setFontSize] = useState('2rem') // large larger medium small smaller x-large x-small xx-large xx-small
  const [selectColor, setSelectColor] = useState('green')

  const selectedVersion = useRef("NASB") //RV1960
  const selectedBookName = useRef('Genesis')
  const selectedBookId = useRef(1)
  const selectedChapter = useRef(1)

  const [chapterInfo, setChapterInfo] = useState([])

  const [allBooksByVersionsSelected, setAllBooksByVersionSelected] = useState([])
  const allChapterBookSelected = useRef([])

  const [alReadyLoaded, setAlReadyLoaded] = useState(false)

  // const {isLoading: isLoading1, error: error1, data: allVersionsByLanguage} = useQuery('allVersionsByLanguage', () => {
  //   return axios.get('https://bolls.life/static/bolls/app/views/languages.json')
  //   .then(data => data.data)
  // })

  /* const {isLoading: isLoading2, error: error2, data: allVersionsBySelectedLanguage, refetch: refetchallVersionsBySelectedLanguage} = useQuery('allVersionsBySelectedLanguage', async () => {
    let translations 
    if (selectedLanguage.current !== "All") {
      translations = await axios.get('https://bolls.life/static/bolls/app/views/languages.json')
      // .then(data => data.data.filter((currentVersion) => currentVersion.language === selectedLanguage.current))[0].translations
      .then(data => data.data.filter((currentVersion) => currentVersion.language === selectedLanguage.current)[0].translations)
    }else{
      translations = await axios.get('https://bolls.life/static/bolls/app/views/languages.json')
      .then(data => {
        let arr = []
        data.data.map(currentVersion => arr.push(...currentVersion.translations))
        return arr
      })
    }
    return translations
  }) */

  const {isLoading: isLoading2, error: error2, data: allVersionsBySelectedLanguage} = useQuery('allVersionsBySelectedLanguage', async () => {
    return await axios.get('https://bolls.life/static/bolls/app/views/languages.json')
      .then(data => {
        let arr = []
        data.data.map(currentVersion => arr.push(...currentVersion.translations))
        return arr
      })
  })

  const {isLoading: isLoading3, error: error3, data: allVersions} = useQuery('allVersions', () => {
    return axios.get(`https://bolls.life/static/bolls/app/views/translations_books.json`)
    .then(res => res.data)
  })

  const {isLoading: isLoading4, error: error4, data: allBooksByVersions} = useQuery('allBooksByVersions', async () => {
    
    let result = await axios.get('https://bolls.life/static/bolls/app/views/languages.json')
    .then(res => {
      let names = []
      res.data.map(element => {
        element.translations.map((current) => {
          names.push(current.short_name)
        })
      })
      return names
    }) // short_names
    .then(async (names) => {
      let result = names.map(async (name) => {
        let promiseData = await axios.get(`https://bolls.life/get-books/${name}/`)
        .then(res => {
          return {"name": name, "data": res.data}
        })
        return promiseData
      })
      return Promise.all(result)
      .then(res => res)
    })// short_names with data(allBooks)

    changeBooksList(result)

    return result
  }) // this has a delay i think

  if (alReadyLoaded === false) {
    setAlReadyLoaded(true)
    setTheme((localStorage.getItem("theme") === "true"))
    if (localStorage.getItem("selectedVersion") !== undefined && localStorage.getItem("selectedVersion") !== null) {
      selectedVersion.current = localStorage.getItem("selectedVersion")
    }

    if (localStorage.getItem("fontSize") !== null && localStorage.getItem("fontSize") !== undefined) {
      setFontSize(localStorage.getItem("fontSize"))
    }

    if (localStorage.getItem("selectColor") !== null && localStorage.getItem("selectColor") !== undefined) {
      setSelectColor(localStorage.getItem("selectColor"))
    }

    if (localStorage.getItem("selectedBookName") !== null && localStorage.getItem("selectedBookName") !== undefined) {
      selectedBookName.current = localStorage.getItem("selectedBookName")
    }

    if (localStorage.getItem("selectedChapter") !== null && localStorage.getItem("selectedChapter") !== undefined) {
      selectedChapter.current = parseInt(localStorage.getItem("selectedChapter"))
    }

    if (localStorage.getItem("selectedBookId") !== null && localStorage.getItem("selectedBookId") !== undefined) {
      selectedBookId.current = parseInt(localStorage.getItem("selectedBookId"))
    }

    findSelected("none", "none")
  }

  function quitarAcentos(cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
  }

  function highlightText(verse){
    let selectedVerses = localStorage.getItem('selectedVerses') !== null ? JSON.parse(localStorage.getItem('selectedVerses')) : []

    let sended = {"verse": parseInt(verse), "bookName": selectedBookName.current, "chapter": parseInt(selectedChapter.current), "bookId": parseInt(selectedBookId.current)}
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
            && parseInt(currentSelected.chapter) === parseInt(selectedChapter.current) 
            && parseInt(currentSelected.verse) === parseInt(currentVerse.verse)) {
              currentVerse.selected = "Yes"
          }
        })
        return currentVerse
      })
      setChapterInfo(chapter)
      setLoading(false)
      setError(undefined)
    })
    // .catch(error => {
    //   setLoading(false)
    //   setError(error)
    // })
  }

  function find(){
    // setVerseofday(false)
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

    localStorage.setItem("selectedBookName", selectedBookName.current)
    localStorage.setItem("selectedChapter", localselectedChapter)
    // setInfoFinder("")
  }

  function findSelected(event, which){
    setError(undefined)
    setLoading(true)
    setChapterInfo([])

    switch(which){
      case "version":
        // setSelectedVersion(event.target.value)
        selectedVersion.current = event.target.value
        if (selectedBookId.current !== undefined && selectedChapter.current !== undefined) {
          changeTranslation()
        }
        // setTranslate(true)
        changeBooksList(allBooksByVersions)
      break;

      case "book":
        selectedBookName.current = event.target.value
        allBooksByVersionsSelected.forEach((current, index) => {
          if (current.name === event.target.value) {
            selectedBookId.current = index + 1
          }
        })
        selectedChapter.current = 1
        changeBooksList(allBooksByVersions)
      break;

      case "chapter":
        selectedChapter.current = event.target.value
      break;

      default:
      break;
    }

    if (event !== "None") {
      getTheData(selectedVersion.current, selectedBookId.current, selectedChapter.current)
      saveData(which)
    }
  }

  function saveData(which){
    switch(which){
      case "version":
        localStorage.setItem("selectedVersion", selectedVersion.current)
        localStorage.setItem("selectedBookName", selectedBookName.current)
        
        break;

      case "book":
        localStorage.setItem("selectedBookName", selectedBookName.current)
        localStorage.setItem("selectedChapter", 1)
        localStorage.setItem("selectedBookId", selectedBookId.current)

      break;

      case "chapter":
        localStorage.setItem("selectedChapter", selectedChapter.current)
      break;

      case "controllers":
        localStorage.setItem("selectedBookName", selectedBookName.current)
        localStorage.setItem("selectedChapter", selectedChapter.current)
        localStorage.setItem("selectedBookId", selectedBookId.current)
      break;

      default:
      break;
    }
  }

  function changeTranslation(){
    // setVerseofday(false)
    setError(undefined)
    setLoading(true)
    setChapterInfo([])
    // setTranslate(true)

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

  function changeChapter(where){
    setError(undefined)
    setLoading(true)

    switch (where) {
      case "previous":
        selectedBookId.current = selectedBookId.current
        selectedChapter.current = parseInt(selectedChapter.current) - 1

        console.log(selectedBookId.current)

        if (parseInt(selectedChapter.current) === 0) {
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
        selectedChapter.current = parseInt(selectedChapter.current) + 1

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

        if (parseInt(selectedChapter.current) > howManyChaptersHave) {
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

    saveData("controllers")
  }

  function changeBooksList(data){
    data.map((current) => {
      if (current.name === selectedVersion.current) {
        setAllBooksByVersionSelected(current.data)
        current.data.map((current, index) => {
          if (index + 1 === selectedBookId.current) {
            allChapterBookSelected.current = []
            for (let i = 1; i < current.chapters + 1; i++) {
              allChapterBookSelected.current = [...allChapterBookSelected.current, i]
            }
          }
        })
      }
    })
  }

  function changeTheme(){
    setTheme(prev => !prev)
    localStorage.setItem("theme", !theme)
  }

  function changeFontSize(event){
    setFontSize(event.target.value)
    localStorage.setItem("fontSize", event.target.value)
  }

  function changeColor(event){
    setSelectColor(event.target.value)
    localStorage.setItem("selectColor", event.target.value)
  }

  const selectedStyleForText = {
    backgroundColor: `${selectColor}`,
    fontSize: `${fontSize}`
  }

  const notSelectedStyleForText = {
    fontSize: `${fontSize}`
  }

  return (
    <div className={theme ? "animate__animated animate__fadeIn App-dark" : "animate__animated animate__fadeIn App-light"}>
      <Header 
        theme={theme}
        changeTheme={changeTheme}
      />
      {
        (allBooksByVersions) ? 
        <Navbar
          infoFinder={infoFinder}
          setInfoFinder={setInfoFinder}
          find={find}
          selectedVersion={selectedVersion}
          allVersionsBySelectedLanguage={allVersionsBySelectedLanguage}
          changeFontSize={changeFontSize}
          changeColor={changeColor}
          selectColor={selectColor}
          fontSize={fontSize}
          selectedBookName={selectedBookName}
          selectedChapter={selectedChapter}
          allBooksByVersionsSelected={allBooksByVersionsSelected}
          allChapterBookSelected={allChapterBookSelected}
          findSelected={findSelected}
        />
        :
        null
      }   
      <div className="app-content">
        <div>
          {
            (loading || /* isLoading1 || */ isLoading2 ||isLoading3 ||isLoading4) ?
            <Loading/>
            :
            null
          }
          {
            (error !== undefined || /* error1 || */ error2 || error3 || error4) ?
            <Error
              hasErrors={error.message}
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
                {/* <button className='controller-chapter' onClick={() => changeChapter("previous")}>{parseInt(selectedChapter.current - 1) === 0 ? allBooksByVersionsSelected[selectedBookId.current - 2].name : selectedBookName.current} {parseInt(selectedChapter.current - 1) === 0 ? allBooksByVersionsSelected[selectedBookId.current - 2].chapters : selectedChapter.current - 1}</button> */}
                {/* <button className='controller-chapter' onClick={() => changeChapter("next")}>{selectedBookName.current} {selectedChapter.current + 1}</button> */}
                
                <button className='controller-chapter' onClick={() => changeChapter("previous")}>Previous Chapter</button>  
                <button className='controller-chapter' onClick={() => changeChapter("next")}>Next Chapter</button>
              </div>
              <br />
              {
                chapterInfo.map((current, index) => {
                  return(
                    <p key={index} className="content-verse" >
                      <span className='content-verse-number'>{current.verse} </span> 
                      <span 
                        className={current.selected === "No" ? "verse" : "verse-selected"} 
                        style={current.selected === "No" ? notSelectedStyleForText : selectedStyleForText}
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