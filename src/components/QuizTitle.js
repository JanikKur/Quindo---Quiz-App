import React from 'react'

export default function QuizTitle({title, author}) {
    return (
        <section className='title-section'>
            <h1 className='quiz-title'>{title}</h1>
            <h3 className='quiz-author'>erstellt von {author}</h3>
        </section>
    )
}
