import React from 'react'
import {Oval} from "react-loader-spinner";
import '../App.css'

function Loading() {
  return (
    <div className='loading-container'>
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={2}
          strokeWidthSecondary={2}
          color="blue"
          secondaryColor="white"
        />
    </div>
  )
}

export default Loading