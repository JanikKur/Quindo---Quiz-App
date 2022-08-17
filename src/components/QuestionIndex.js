import React from 'react'
import checkAnswers from '../utils/checkAnswers'

export default function QuizIndex({questions, isSubmitted, correctAnswers, answers, setCurrentQuestionIndex, currentQuestionIndex}) {
  return (
    <article className='quiz-index'>
          {
              questions.map((question,idx) => {
                return <button key={question.id} className={`index-button ${(currentQuestionIndex === idx) ? 'active' : ''} ${(isSubmitted && checkAnswers(correctAnswers[idx], answers[idx], question.questionType === 'text') ? 'correct' : (isSubmitted ? 'false' : ''))}`} onClick={() => setCurrentQuestionIndex(idx)}>{idx + 1}</button>
              })
          }
    </article>
  )
}
