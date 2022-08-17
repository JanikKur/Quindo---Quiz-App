import React from 'react'
import {AiFillDelete} from 'react-icons/ai';

export default function Answer({data, setAnswers}) {
  return (
    <div className="answer-wrapper">
      <p className={`answer ${data.isTrue ? 'correct' : 'false'}`} >
        {data.answerText}
      </p>
      <AiFillDelete className='delete-button' onClick={() => {setAnswers(prev => prev.filter(answer => answer.id !== data.id))}} />
    </div>
  )
}
