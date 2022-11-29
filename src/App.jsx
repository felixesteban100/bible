import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header'
import BiblesList from './components/BiblesList'
import SelecteBooks from './components/SelecteBooks'
import SelecteChapter from './components/SelecteChapter'
import DisplayChapter from './components/DisplayChapter'

function App() {
  const [bibleListDisplay, setBibleListDisplay] = useState(true)
  const [selectedBibleVersionById, setSelectedBibleVersionById] = useState()
  const [selectedBookId, setSelectedBookId] = useState()
  const [selectedChapterId, setSelectedChapterId] = useState()

  function getVersion(bibleVersion){
    // console.log(bibleVersion.id)
    setSelectedBibleVersionById(bibleVersion.id)
    displayBooks()
  }

  function displayBooks(){
    setBibleListDisplay(false)
  }

  function getBack(){
    setBibleListDisplay(true)
    setSelectedBibleVersionById(undefined)
    setSelectedBookId(undefined)
    setSelectedChapterId(undefined)
  }

  function getChapter(book){
    console.log(book.id) 
    setSelectedBookId(book.id)
  }

  function getChapterInfo(chapter){
    console.log(chapter.id)
    setSelectedChapterId(chapter.id)
  }

  // useEffect(() => {
  //     // async function fetchBibles(){
  //     //     try {
  //     //         let header = {
  //     //             method: 'GET',
  //     //             mode: 'cors',
  //     //             headers: {
  //     //                 'Content-Type': 'application/json',
  //     //                 'api-key': '4aad4efe36364c95d44b4bbbdcffa9b0'
  //     //             }  
  //     //         };
  //     //         const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${selectedBibleVersionById}`, header);
  //     //         const bible = await data.json()
  //     //         if (bible.data !== undefined) {
  //     //           // console.log(bible.data)
  //     //         }
  //     //     } catch (error) {
  //     //         console.log(error)
  //     //     }
  //     // }
  //     // fetchBibles()
  // }, [selectedBibleVersionById])

  return (
    <div className="App">
      <Header />
      {
        bibleListDisplay && 
        <BiblesList 
          getVersion={getVersion}
        />
      }
      {
        (!bibleListDisplay) &&
        <button onClick={() => getBack()}>get back</button>
      }
      {
        (!bibleListDisplay && selectedBookId === undefined) &&
        <SelecteBooks 
          getChapter={getChapter}
          selectedBibleVersionById={selectedBibleVersionById}
        />
      }
      {
        (!bibleListDisplay && selectedBookId !== undefined && selectedChapterId === undefined) &&
        <SelecteChapter 
          getChapterInfo={getChapterInfo}
          selectedBibleVersionById={selectedBibleVersionById}
          selectedBookId={selectedBookId}
        />
      }
      {
        (!bibleListDisplay && selectedBookId !== undefined && selectedChapterId !== undefined) &&
        <DisplayChapter
          selectedBibleVersionById={selectedBibleVersionById}
          selectedChapterId={selectedChapterId}
        />
      }
    </div>
  )
}

export default App
