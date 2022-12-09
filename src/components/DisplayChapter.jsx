import React from 'react'
import "../App.css"
import 'animate.css';

function DisplayChapter({}) { 
    return (
        <div>
            {
                chapter !== undefined &&
                <div className='animate__animated animate__fadeIn'>
                    <p className='chapter-title'>{chapter.reference}</p>
                    <div className='controls'>
                        {
                            chapter.previous !== undefined ?
                            <div className='chapter-button' onClick={() => setChangeChapterId(chapter.previous.id)} >{chapter.previous.bookId} {chapter.previous.number}</div>
                            :
                            <div className='chapter-button-none'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        }
                        {
                            chapter.next !== undefined ?
                            <div className='chapter-button' onClick={() => setChangeChapterId(chapter.next.id)}>{chapter.next.bookId} {chapter.next.number}</div>
                            :
                            <div className='chapter-button-none'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        }
                    </div>
                    <div className='chapter-content' dangerouslySetInnerHTML={{ __html: chapter.content}}>
                    </div>
                    <div className='controls'>
                        {
                            chapter.previous !== undefined ?
                            <div className='chapter-button' onClick={() => setChangeChapterId(chapter.previous.id)} >{chapter.previous.bookId} {chapter.previous.number}</div>
                            :
                            <div className='chapter-button-none'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        }
                        {
                            chapter.next !== undefined ?
                            <div className='chapter-button' onClick={() => setChangeChapterId(chapter.next.id)}>{chapter.next.bookId} {chapter.next.number}</div>
                            :
                            <div className='chapter-button-none'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default DisplayChapter