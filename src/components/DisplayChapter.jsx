import React, { useState, useEffect } from 'react'
import "../App.css"

function DisplayChapter({selectedBibleVersionById, selectedChapterId}) { 
    const [chapter, setChapter] = useState([])

    useEffect(() => {
        async function fetchChapter(){
          try {
              let header = {
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                      'Content-Type': 'application/json',
                      'api-key': '4aad4efe36364c95d44b4bbbdcffa9b0'
                  }  
              };
              const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${selectedBibleVersionById}/chapters/${selectedChapterId}`, header);
              const chapter = await data.json()
              if (chapter.data !== undefined) {
                console.log(chapter.data)
                setChapter(chapter.data)
              }
          } catch (error) {
              console.log(error)
          }
      }
      fetchChapter()
    }, [])

    return (
        <div>
            <p className='chapter-title'>{chapter.reference}</p>
            <div className='chapter-content' dangerouslySetInnerHTML={{ __html: chapter.content}}>
            </div>
        </div>
    )
}

export default DisplayChapter