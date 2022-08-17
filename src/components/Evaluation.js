import React from 'react'
import CorrectAnswersBar from './CorrectAnswersBar';
import checkAnswers, { getCorrectAnswersCount } from '../utils/checkAnswers';

export default function Evaluation({correctAnswers, answers, questions}) {
    return (
        <section className='quiz-answers'>
            <h3>Dein Ergebnis</h3>
            <article className='quiz-statistics'>
                <CorrectAnswersBar percentage={Math.round(correctAnswers.map((answer, idx) => checkAnswers(answer, answers[idx], questions[idx].questionType === 'text')).filter(elem => elem).length / correctAnswers.length * 100)} />
                <p>Du hast {getCorrectAnswersCount(correctAnswers, answers, questions)} von {correctAnswers.length} Fragen korrekt beantwortet</p>
            </article>
        </section>
  )
}
