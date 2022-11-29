import React, {useState, useEffect} from 'react'
import "../App.css"

function SelecteBooks({selectedBibleVersionById, getBook}) {
    const [bibleVersionBooks, setBibleVersionBooks] = useState([])

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
              const data = await fetch(`https://api.scripture.api.bible/v1/bibles/${selectedBibleVersionById}/books`, header);
              const books = await data.json()
              if (books.data !== undefined) {
                // console.log(books.data)
                setBibleVersionBooks(books.data)
              }
          } catch (error) {
              console.log(error)
          }
      }
      fetchBooks()
    }, [])

    return (
        <div className='selectedbooks-container'>
            {
                bibleVersionBooks.map((current, index) => {
                    return(
                        <div key={index}  className='selectedbook-container' onClick={() => getBook(current)}>
                            <p className='book-name'>{current.name} ({current.id})</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SelecteBooks