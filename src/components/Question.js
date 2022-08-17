import React from 'react'
import Answer from './Answer'

export default function Question({ data }) {
    return (
        <details className='question'>
            <summary>
                {data.questionText}
            </summary>
            <div className="answers">
                {
                    data.answers.map(answer => <Answer key={answer.id} data={answer} />)
                }
            </div>
        </details>
    )
}
