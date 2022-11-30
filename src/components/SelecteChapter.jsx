import React, { useState, useEffect } from 'react'
import "../App.css"
import 'animate.css';

function SelecteChapter({getChapterInfo, selectedBookId, selectedBibleVersionById}) {
    const [bibleVersionBookChapter, setBibleVersionBookChapter] = useState([])

    useEffect(() => {
        async function fetchBooks(){
          try {
              let header = {
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                      'Content-Type': 'application/json',
                      'api-key': '4aad4efe36364c95d44b4bbbdcffa9b0'
                  }  
              };
              const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${selectedBibleVersionById}/books/${selectedBookId}/chapters`, header);
              const chapters = await data.json()
              if (chapters.data !== undefined) {
                // console.log(chapters.data)
                setBibleVersionBookChapter(chapters.data)
              }
          } catch (error) {
              console.log(error)
          }
      }
      fetchBooks()
    }, [])

    return (
        <div className='animate__animated animate__fadeIn selectedchapters-container'>
            {
                bibleVersionBookChapter.map((current, index) => {
                    return(
                        <div key={index} className='selectedchapter-container' onClick={() => getChapterInfo(current)}>
                            <p className='chapter-number'>{current.number}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SelecteChapter