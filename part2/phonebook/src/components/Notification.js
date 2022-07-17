import React from "react"

const Info = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='info'>
      {message}
    </div>
  )
}


const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default { Info, Error }