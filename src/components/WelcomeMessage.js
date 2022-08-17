import React from 'react'

export default function WelcomeMessage({username}) {
  return (
    username ? <h2>Willkommen {username}</h2> : <h2>Willkommen auf Qindo</h2>
  )
}
