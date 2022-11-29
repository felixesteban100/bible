import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header'
import BiblesList from './components/BiblesList'
import SelecteBooks from './components/SelecteBooks'
import SelecteChapter from './components/SelecteChapter'
import DisplayChapter from './components/DisplayChapter'
import Navbar from './components/Navbar'

function App() {
  const [bibleListDisplay, setBibleListDisplay] = useState(undefined)
  const [selectedBibleVersionById, setSelectedBibleVersionById] = useState()
  const [selectedBibleVersionAllInfo, setSelectedBibleVersionAllInfo] = useState()
  const [selectedBookId, setSelectedBookId] = useState()
  const [selectedBookAllInfo, setSelectedBookAllInfo] = useState()
  const [selectedChapterId, setSelectedChapterId] = useState()
  const [selectedChapterAllInfo, setSelectedChapterAllInfo] = useState()

  const [hiddeNavbar, setHiddeNavbar] = useState(false)


  function returnHome(){
    setBibleListDisplay(undefined)
    setSelectedBibleVersionById(undefined)
    setSelectedBibleVersionAllInfo(undefined)
    setSelectedBookId(undefined)
    setSelectedBookAllInfo(undefined)
    setSelectedChapterId(undefined)
    setSelectedChapterAllInfo(undefined)
  }

  function getVersion(bibleVersion){
    setSelectedBibleVersionAllInfo(bibleVersion)
    setSelectedBibleVersionById(bibleVersion.id)
    setBibleListDisplay("book")
  }

  function getBook(book){
    setSelectedBookAllInfo(book)
    setSelectedBookId(book.id)
    setBibleListDisplay("chapter")
  }

  function getChapterInfo(chapter){
    setSelectedChapterAllInfo(chapter)
    setSelectedChapterId(chapter.id)
    setBibleListDisplay("chapterInfo")
  }

  function getBack(value){
    switch(value){
      case "book":
        setBibleListDisplay(value)  
        setSelectedBookAllInfo(undefined)
        setSelectedBookId(undefined)
        setSelectedChapterAllInfo(undefined)
        setSelectedChapterId(undefined)
      break;
      case "chapter":
        setBibleListDisplay(value)  
        setSelectedChapterAllInfo(undefined)
        setSelectedChapterId(undefined)
      break;
      case "chapterInfo":
        setBibleListDisplay(value) 
      break;
    }
  }

  return (
    <div className="App">
      <Header 
        setHiddeNavbar={setHiddeNavbar}
      />
      {
        hiddeNavbar === false &&
        <Navbar 
          returnHome={returnHome}
          getBack={getBack}
          selectedBibleVersionAllInfo={selectedBibleVersionAllInfo}
          selectedBookAllInfo={selectedBookAllInfo}
          selectedChapterAllInfo={selectedChapterAllInfo}
        />
      }
      <div className='app-content'>
        
        {
          bibleListDisplay === undefined && 
          <BiblesList 
            getVersion={getVersion}
          />
        }
        {
          (bibleListDisplay === "book") &&
          <SelecteBooks 
            getBook={getBook}
            selectedBibleVersionById={selectedBibleVersionById}
          />
        }
        {
          (bibleListDisplay === "chapter") &&
          <SelecteChapter 
            getChapterInfo={getChapterInfo}
            selectedBibleVersionById={selectedBibleVersionById}
            selectedBookId={selectedBookId}
          />
        }
        {
          (bibleListDisplay === "chapterInfo") &&
          <DisplayChapter
            selectedBibleVersionById={selectedBibleVersionById}
            selectedChapterId={selectedChapterId}
            setSelectedChapterId={setSelectedChapterId}
            setSelectedChapterAllInfo={setSelectedChapterAllInfo}
          />
        }
      </div>
    </div>
  )
}

export default App
