import React, { useState, useEffect } from 'react'
import "../App.css"

function DisplayChapter({selectedBibleVersionById, selectedChapterId, setSelectedChapterId, setSelectedChapterAllInfo}) { 
    const [chapter, setChapter] = useState(undefined)
    const [changeChapterId, setChangeChapterId] = useState(undefined)

    const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '4aad4efe36364c95d44b4bbbdcffa9b0'
        }  
    };

    useEffect(() => {
        async function fetchChapter(id){
            try {
                const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${selectedBibleVersionById}/chapters/${id}`, header);
                const chapter = await data.json()
                if (chapter.data !== undefined) {
                //   console.log(chapter.data)
                  setChapter(chapter.data)
                  setSelectedChapterId(chapter.data.id)
                  setSelectedChapterAllInfo(chapter.data)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        
        if (changeChapterId === undefined) {
            fetchChapter(selectedChapterId)
        }

        if (changeChapterId !== undefined) {
            fetchChapter(changeChapterId)
        }
    }, [changeChapterId])

    return (
        <div>
            {
                chapter !== undefined &&
                <div>
                    <p className='chapter-title'>{chapter.reference}</p>
                    <div className='controls'>
                        <div className='chapter-button' onClick={() => setChangeChapterId(chapter.previous.id)} >{chapter.previous.bookId} {chapter.previous.number}</div>
                        <div className='chapter-button' onClick={() => setChangeChapterId(chapter.next.id)}>{chapter.next.bookId} {chapter.next.number}</div>
                    </div>
                    <div className='chapter-content' dangerouslySetInnerHTML={{ __html: chapter.content}}>
                    </div>
                    <div className='controls'>
                        <div className='chapter-button' onClick={() => setChangeChapterId(chapter.previous.id)} >{chapter.previous.bookId} {chapter.previous.number}</div>
                        <div className='chapter-button' onClick={() => setChangeChapterId(chapter.next.id)}>{chapter.next.bookId} {chapter.next.number}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayChapter