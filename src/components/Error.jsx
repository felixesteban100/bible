import React from 'react'
import '../App.css'

function Error({hasErrors}) {
  return (
    <div className='error-container'>
        <h1 className='error-text'>{hasErrors}</h1>
    </div>
  )
}

export default Error